"use client";
import React, { useState, useContext, useEffect, MouseEvent } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import styles from "./navbar.module.css";
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import CartItem from "./CartItem";
import { create } from "zustand";

interface CartItem {
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
  setCart: (e: CartItem[]) => set((state) => ({ cart: [...state.cart, ...e] })),
  removeItemFromCart: (id) => {
    let cart = get().cart;
    cart = cart.filter((c) => c.id != id);
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
  book_id: string;
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

  const cart = useCartStore((state) => state.cart);

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
  // useEffect(() => {
  //   async function getCart() {
  //     const response = fetch("/api/cart");
  //     return await response.json() as cartFromServer[];
  //   }

  //   try {
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });

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
              // <Link className={styles.loginButton} href={"/login"}>
              //   <FaUserCircle />
              // </Link>
              <Link href={"/api/auth/signin"} className={styles.logButton}>
                Log In
              </Link>
            ) : (
              <Link className={styles.loginButton} href={"/profile"}>
                <FaUserCircle />
              </Link>
            )}
            <div className={styles.cart} onClick={handleCartClick}></div>
            {/* <div>{`[${cart.reduce(
              (num, item) => num + item.quantity,
              0
            )}]`}</div> */}
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
                <Link
                  className={styles.links}
                  href={session ? "/profile" : "/login"}
                  onClick={handleClick}
                >
                  My Account
                </Link>
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
                  <Link href={"/api/auth/logout"} className={styles.logButton}>
                    Log Out
                  </Link>
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
                <ImCross onClick={handleCartClick} />
              </div>
              {/* <div className={styles.cartHeading}>{`CART [${cart.reduce(
                (num, item) => num + item.quantity,
                0
              )}]`}</div> */}
              <div className={styles.cartItems}>
                {cart.map((item) => {
                  return (
                    <CartItem
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
                  <h1>No Books In The Shelf?</h1>
                ) : (
                  //fix this ugly piece of shit @sahitya
                  <div className={styles.checkoutContainer}>
                    <div className={styles.subtotalContainer}>
                      <div className={styles.subtotalHeading}>SUBTOTAL</div>
                      <div
                        className={styles.subtotalPrice}
                      >{`$${totalPrice.toFixed(2)}`}</div>
                    </div>
                    <div className={styles.shippingContainer}>
                      <div className={styles.shippingHeading}>Shipping</div>
                      <div className={styles.shipping}>$0.00</div>
                    </div>
                    <div className={styles.checkoutButton}>CHECKOUT</div>
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
