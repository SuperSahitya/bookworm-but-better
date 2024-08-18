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

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e0e0e0" offset="20%" />
      <stop stop-color="#c0c0c0" offset="50%" />
      <stop stop-color="#e0e0e0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e0e0e0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

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
          // style={{
          //   backgroundImage: `url(${imageUrl})`,
          //   backgroundSize: "cover",
          // }}
        >
          <Image src={imageUrl} alt={bookName} fill={true} placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}></Image>
        </div>
        <div className={styles.data}>
          <div className={styles.bookData}>
            <div className={styles.bookName}>{bookName}</div>
            <div className={styles.author}>{author}</div>
          </div>
          <div className={styles.price}>{`₹${price.toFixed(2)}`}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
