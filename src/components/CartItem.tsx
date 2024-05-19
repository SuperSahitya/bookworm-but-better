"use client";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import styles from "./cartItem.module.css";
import { useState, useContext } from "react";
import { Updation, useCartStore } from "./Navbar";

interface cartItemProps {
  userId?: string,
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
  const handleRemove = () => {
    removeItemFromCart(id);
    console.log(cart);
  };

  const { updateQuantity } = useCartStore();
  const handleQuantityChange = (id: string, u: Updation) => {
    updateQuantity(id, u);
    console.log(cart);
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
