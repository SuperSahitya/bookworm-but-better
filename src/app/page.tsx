"use client";
import Image from "next/image";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Introduction from "~/components/Introduction";
import Card from "~/components/Card";

export default function Home() {
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

  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setError("");
        const result = await fetch("/api/books");
        const dataArray: Data[] = (await result.json()) as Data[];
        setData(dataArray);
      } catch (error) {
        setError("An unexpected error occurred while fetching books.");
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }
    getData().catch((error) => console.error("Failed to fetch books:", error));
  }, []);

  return (
    <>
      <div className={styles.container}>
        {!error ? <Introduction></Introduction> : <div className={styles.error}>{error}</div>}
        {loading ? (
          <div className={styles.loaderContainer}></div>
        ) : (
          data.map((m) => {
            return (
              <Link href={`/${m.id}`} key={m.id}>
                <Card
                  bookId={m.id}
                  key={m.id}
                  bookName={m.name}
                  author={m.author}
                  price={m.price}
                  imageUrl={m.imageUrl}
                  stock={m.stock}
                ></Card>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}
