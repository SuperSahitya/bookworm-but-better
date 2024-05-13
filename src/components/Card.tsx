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

const style = {
  height: "70%",
  "aspect-ratio": "467/700",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  outline: "2px dashed #321e1e",
  outlineOffset: "3px",
};

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
        <Image
          className={styles.image}
          height={100}
          width={100}
          src={imageUrl}
          style={style}
          alt={bookName}
        ></Image>
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
