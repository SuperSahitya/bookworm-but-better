"use client";
import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import styles from "./cartItem.module.css";
import { useState } from "react";
import { Updation, useCartStore } from "./Navbar";
import { useSession } from "next-auth/react";

interface cartItemProps {
  userId?: string;
  id: string;
  bookName: string;
  authorName: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartItemIdx {
  userId?: string;
  id: string;
  name: string;
  author: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const CartItem = ({
  userId,
  id,
  bookName,
  authorName,
  price,
  imageUrl,
  quantity,
}: cartItemProps) => {
  const { cart, setCart, removeItemFromCart } = useCartStore();
  const handleRemove = async () => {
    const previousCart = cart;
    removeItemFromCart(id);
    if (session && session.user && session.user.id) {
      try {
        const res = await fetch("/api/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) {
          setCart(previousCart);
        }
      } catch (error) {
        console.error("Failed to remove items from the database.", error);
        setCart(previousCart);
      }
    } else {
      try {
        localStorage.setItem("guestCart", JSON.stringify(cart));
      } catch (error) {
        console.error("An Error Occured While Saving Cart: ", error);
      }
    }
  };

  const { updateQuantity } = useCartStore();
  const { data: session, status } = useSession();

  const handleQuantityChange = async (id: string, u: Updation) => {
    const newQuantity = u === Updation.Increase ? quantity + 1 : quantity - 1;
    const previousCart = JSON.parse(JSON.stringify(cart)) as CartItemIdx[];
    // const previousCart = cart
    updateQuantity(id, u);

    if (session && session.user && session.user.id) {
      if (newQuantity > 0) {
        try {
          const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              {
                userId: session.user.id,
                id,
                name: bookName,
                author: authorName,
                price,
                imageUrl,
                quantity: newQuantity,
              },
            ]),
          });

          if (!res.ok) {
            setCart(previousCart);
          }
        } catch (error) {
          console.error("Failed to update quantity in the database", error);
          setCart(previousCart);
        }
      } else {
        try {
          const res = await fetch("/api/cart", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });

          if (!res.ok) {
            setCart(previousCart);
          }
        } catch (error) {
          console.error("Failed to remove item from the database", error);
          setCart(previousCart);
        }
      }
    } else {
      try {
        localStorage.setItem("guestCart", JSON.stringify(cart));
      } catch (error) {
        console.error("An Error Occured While Saving Cart: ", error);
      }
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>
      <div className={styles.cartDataContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.bookData}>
            <div className={styles.bookName}>{bookName}</div>
            <div className={styles.authorName}>{authorName}</div>
          </div>
          <div className={styles.price}>{`₹${price.toFixed(2)}`}</div>
        </div>
        <div className={styles.quantityDiv}>
          <div className={styles.quantityContainer}>
            <div
              className={styles.sign}
              onClick={() => handleQuantityChange(id, Updation.Decrease)}
            >
              -
            </div>
            <div className={styles.quantity}>{quantity}</div>
            <div
              className={styles.sign}
              onClick={() => handleQuantityChange(id, Updation.Increase)}
            >
              +
            </div>
          </div>
          <div className={styles.remove} onClick={handleRemove}>
            <MdDeleteForever />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
