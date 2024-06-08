"use client";
import React, { useEffect, useState } from "react";
import styles from "./orderItem.module.css";

interface OrderItem {
  bookId: string;
  unit_price: number;
  quantity: number;
}

type Data = {
  id: number;
  name: string;
  author: string;
  year: number;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  details: string[];
  imageUrl: string;
};

const OrderItem = ({ bookId, unit_price, quantity }: OrderItem) => {
  const [book, setBook] = useState({} as Data);

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetch(`/api/product/${bookId}`);
        const fetchedData: Data[] = (await result.json()) as Data[];
        const bookData = fetchedData[0]!;
        setBook(bookData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    }
    getData().catch((error) => console.error("Failed to fetch books:", error));
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${book.imageUrl})` }}
            // style={{ backgroundImage: `url(${book.imageUrl})` }}
          ></div>
        </div>
        <div className={styles.cartDataContainer}>
          <div className={styles.dataContainer}>
            <div className={styles.bookData}>
              <div className={styles.bookName}>{book.name}</div>
              <div className={styles.authorName}>{book.author}</div>
            </div>
            <div className={styles.price}>{`₹${unit_price.toFixed(2)}`}</div>
          </div>
          <div className={styles.quantityDiv}>
            <div className={styles.quantityContainer}>
              <div className={styles.quantity}>{quantity}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
