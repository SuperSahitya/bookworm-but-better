"use client";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import styles from "./cartItem.module.css";
import { useState, useContext } from "react";

interface cartItemProps {
  id: string;
  bookName: string;
  authorName: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const CartItem = ({
  id,
  bookName,
  authorName,
  price,
  imageUrl,
  quantity,
}: cartItemProps) => {
  const handleIncrease = () => {
    console.log("increase quantity");
  };
  const handleDecrease = () => {
    console.log("decrease quantity");
  };
  const handleRemove = () => {
    console.log("remove item");
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
            <div className={styles.sign} onClick={handleDecrease}>
              -
            </div>
            <div className={styles.quantity}>{quantity}</div>
            <div className={styles.sign} onClick={handleIncrease}>
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
