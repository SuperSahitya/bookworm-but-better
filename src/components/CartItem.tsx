"use client";
import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import styles from "./cartItem.module.css";
import { useState, useContext } from "react";
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

const CartItem = ({
  userId,
  id,
  bookName,
  authorName,
  price,
  imageUrl,
  quantity,
}: cartItemProps) => {
  const { removeItemFromCart } = useCartStore();
  const { cart } = useCartStore();
  const handleRemove = async () => {
    removeItemFromCart(id);
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    // console.log(cart);
  };

  const { updateQuantity } = useCartStore();
  const { data: session, status } = useSession();
  const handleQuantityChange = async (id: string, u: Updation) => {
    const newQuantity = u === Updation.Increase ? quantity + 1 : quantity - 1;

    if (newQuantity > 0) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            userId: session?.user.id,
            id: id,
            name: bookName,
            author: authorName,
            price: price,
            imageUrl: imageUrl,
            quantity: newQuantity,
          },
        ]),
      });
      // console.log({
      //   userId: session?.user.id,
      //   id: id,
      //   bookName: bookName,
      //   authorName: authorName,
      //   price: price,
      //   imageUrl: imageUrl,
      //   quantity: newQuantity,
      // });
      // console.log("senderred", await res.json());

      if (res.ok) {
        updateQuantity(id, u);
        // console.log({
        //   bookName: bookName,
        //   quantity: newQuantity,
        // });
      } else {
        console.error("Failed to update quantity in the database");
      }
    } else {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        updateQuantity(id, u);
      } else {
        console.error("Failed to remove item from the database");
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
          <div className={styles.price}>{`$${price.toFixed(2)}`}</div>
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
