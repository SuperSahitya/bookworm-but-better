"use client";
import React, { useState, useContext, useEffect, MouseEvent } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import styles from "./navbar.module.css";
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import CartItem from "./CartItem";
import { create } from "zustand";
import { createCheckoutSession } from "~/app/action";
import { useRouter } from "next/navigation";

interface CartItem {
  userId?: string;
  id: string;
  name: string;
  author: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export enum Updation {
  Increase = "increase",
  Decrease = "decrease",
}

type UseCartStore = {
  cart: CartItem[];
  updateQuantity: (e: string, u: Updation) => void;
  setCart: (e: CartItem[]) => void;
  removeItemFromCart: (e: string) => void;
  totalPrice: () => number;
};

export const useCartStore = create<UseCartStore>((set, get) => ({
  cart: [],
  updateQuantity: (id, u) => {
    let cart = get().cart;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < cart.length; i++) {
      if (id == cart[i]!.id) {
        if (u == Updation.Increase) {
          cart[i]!.quantity++;
        } else if (u == Updation.Decrease && cart[i]!.quantity > 1) {
          cart[i]!.quantity--;
        } else if (u == Updation.Decrease && cart[i]!.quantity == 1) {
          cart = cart.filter((item) => item.id !== id);
        }
      }
    }
    set({ cart });
  },
  setCart: (newItems: CartItem[]) =>
    set((state) => ({
      cart: [
        ...state.cart.filter(
          (item) => !newItems.some((newItem) => newItem.id === item.id)
        ),
        ...newItems,
      ],
    })),
  removeItemFromCart: (id) => {
    let cart = get().cart;
    cart = cart.filter((c) => c.id !== id);
    set({ cart });
  },
  totalPrice: () => {
    let totalPrice = 0;
    get().cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  },
}));

interface cartFromServer {
  userId: string;
  id: string;
  name: string;
  author: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const Navbar = () => {
  const totalPriceSelector = (state: UseCartStore) => {
    let totalPrice = 0;
    state.cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const totalPrice = useCartStore(totalPriceSelector);

  const { cart } = useCartStore();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const [isOpen, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(true);

  const closeAll = () => {
    setOpen(false);
    setCartOpen(false);
    setOverlayOpen(false);
  };

  useEffect(() => {
    setOverlayOpen(isOpen || cartOpen);
  }, [isOpen, cartOpen]);

  const handleClick = () => {
    setOpen(!isOpen);
    setCartOpen(false);
  };
  const handleCartClick = () => {
    setCartOpen(!cartOpen);
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    if (overlayOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [overlayOpen]);

  const { setCart } = useCartStore();
  useEffect(() => {
    async function getCart() {
      const response = await fetch("/api/cart");
      const cartDataFromSever = (await response.json()) as cartFromServer[];
      setCart(cartDataFromSever);
    }

    try {
      if (session?.user.email) {
        getCart().catch((e) => console.log(e));
      }
    } catch (e) {
      console.error(e);
    }
  }, [session]);

  useEffect(() => {
    async function sendCartDataToserver() {
      const cartWithUserId = cart.map((item) => ({
        ...item,
        userId: session?.user?.id ?? item.userId,
      }));

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartWithUserId),
      });
    }

    const previousCart = cart;
    try {
      if (session?.user) {
        sendCartDataToserver().catch((e) => {
          console.log(e);
          setCart(previousCart);
        });
      }
    } catch (e) {
      console.log(e);
      setCart(previousCart);
    }
  }, [cart]);
  const router = useRouter();
  const handleCheckout = async () => {
    //to-do: block checkout if out of stocks
    //test-card: 4000003560000008
    setLoadingCheckout(true);
    const url = await createCheckoutSession();
    if (url) {
      router.push(url.url!);
    }
    setLoadingCheckout(false);
  };
  return (
    <>
      {overlayOpen && <div className={styles.overlay} onClick={closeAll}></div>}
      <div className={styles.navContainer}>
        <div className={styles.navbar}>
          <div className={styles.hamburger} onClick={handleClick}></div>
          <div className={styles.brand}>
            <div className={styles.logo}></div>
            <div className={styles.name}>BOOKWORM</div>
          </div>
          <div className={styles.cartDataContainer}>
            {!session ? (
              <div
                className={styles.logInNavButton}
                onClick={() => signIn("google")}
              >
                Log In
              </div>
            ) : (
              <Link className={styles.loginButton} href={"/profile"}>
                <FaUserCircle />
              </Link>
            )}
            <div className={styles.cart} onClick={handleCartClick}>
              <div className={styles.cartQuantity}>
                {cart.reduce((num, item) => num + item.quantity, 0)
                  ? cart.reduce((num, item) => num + item.quantity, 0)
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.panel}
              initial={{
                y: "-50vh",
              }}
              animate={{
                y: "0px",
              }}
              exit={{
                y: "-50vh",
              }}
            >
              <div className={styles.links}>
                <Link href={"/"} onClick={handleClick}>
                  Home
                </Link>
                {session ? (
                  <Link
                    className={styles.links}
                    href={"/profile"}
                    onClick={handleClick}
                  >
                    My Account
                  </Link>
                ) : (
                  ""
                )}
                <Link href={"/orders"} onClick={handleClick}>
                  My Orders
                </Link>
                <Link href={"/bookmarks"} onClick={handleClick}>
                  My Bookmarks
                </Link>
                <Link href={"/settings"} onClick={handleClick}>
                  My Settings
                </Link>
                <Link href={"/contact"} onClick={handleClick}>
                  Contact
                </Link>
                {session ? (
                  <div className={styles.logButton} onClick={() => signOut()}>
                    Log Out
                  </div>
                ) : (
                  <Link
                    href={"/login"}
                    className={styles.logButton}
                    onClick={handleClick}
                  >
                    Log In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {cartOpen && (
            <motion.div
              className={styles.cartPanel}
              initial={{
                x: "100vw",
              }}
              animate={{
                x: "0px",
              }}
              exit={{
                x: "100vw",
              }}
            >
              <div className={styles.closeCart}>
                <div>My Cart</div>
                <ImCross onClick={handleCartClick} />
              </div>
              <div className={styles.cartItems}>
                {cart.map((item) => {
                  return (
                    <CartItem
                      userId={session?.user.id}
                      id={item.id}
                      key={item.id}
                      bookName={item.name}
                      authorName={item.author}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      quantity={item.quantity}
                    ></CartItem>
                  );
                })}
                <div className={styles.border}></div>
                {cart.length == 0 ? (
                  //fix this
                  <div className={styles.noBookContainer}>
                    <h2 className={styles.noBookCart}>
                      You have no books in your cart.
                    </h2>
                  </div>
                ) : (
                  <div className={styles.checkoutContainer}>
                    <div className={styles.subtotalContainer}>
                      <div className={styles.subtotalHeading}>SUBTOTAL</div>
                      <div
                        className={styles.subtotalPrice}
                      >{`₹${totalPrice.toFixed(2)}`}</div>
                    </div>
                    <div className={styles.shippingContainer}>
                      <div className={styles.shippingHeading}>Shipping</div>
                      <div className={styles.shipping}>₹0.00</div>
                    </div>
                    <div
                      className={styles.checkoutButton}
                      onClick={handleCheckout}
                    >
                      {loadingCheckout ? "LOADING ..." : "CHECKOUT"}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
