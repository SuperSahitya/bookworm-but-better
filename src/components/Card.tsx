import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

interface cardProps {
  bookId: number;
  bookName: string;
  author: string;
  imageUrl: string;
  price: number;
  stock: number;
}

const Card = ({
  bookId,
  bookName,
  author,
  imageUrl,
  price,
  stock,
}: cardProps) => {
  return (
    <Link href={`/product/${bookId}`}>
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className={styles.data}>
          <div className={styles.bookData}>
            <div className={styles.bookName}>{bookName}</div>
            <div className={styles.author}>{author}</div>
          </div>
          <div className={styles.price}>{`$${price.toFixed(2)}`}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
