"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { FaRegBookmark } from "react-icons/fa";

const Product = ({ params }: { params: { id: number } }) => {
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

  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetch(
          `http://localhost:3000/api/product/${params.id}`
        );
        const fetchedData: Data[] = (await result.json()) as Data[];
        const bookData = fetchedData[0];

        setData(bookData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }
    getData().catch((error) => console.error("Failed to fetch books:", error));
  }, [params.id]);

  if (data) {
    console.log(data);
  }

  const handleAddToCart = (data: Data) => {
    console.log("added to cart");
  };

  return (
    <>
      {!loading && data != undefined && (
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productImages}>
              <div
                className={styles.topImage}
                style={{ backgroundImage: `url(${data.imageUrl})` }}
              ></div>
              <div className={styles.bookInfo}>
                <div className={styles.bookmark}>
                  <FaRegBookmark />
                  Add To Bookshelf
                </div>
                <div className={styles.categoryList}>
                  <h3 className={styles.detail}>CATEGORIES</h3>
                  {data?.categories && (
                    <div className={styles.categoriesName}>
                      {data.categories.map((m, index) => {
                        return (
                          <div key={index} className={styles.category}>
                            {m}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.productData}>
              <div className={styles.productRoute}>All / Book</div>
              <h1 className={styles.productHeading}>{data.name}</h1>
              <div className={styles.productAuthor}>
                {`${data.author}, ${data.year}`}
              </div>
              <div className={styles.productDescription}>
                {data.description}
              </div>
              {data?.price && (
                <div className={styles.productPrice}>{`$${data.price.toFixed(
                  2
                )}`}</div>
              )}
              <div
                className={styles.addToCart}
                onClick={() => handleAddToCart(data)}
              >
                ADD TO CART
              </div>
              <div className={styles.methodToBuy}>
                typically ships in{" "}
                <span className={styles.payLater}>3 - 5 days</span>
              </div>
              <div className={styles.productDetail}>
                <h3 className={styles.detail}>DETAILS -</h3>
                {data?.details && (
                  <ul className={styles.productDetailList}>
                    {data.details.map((m, index) => {
                      return (
                        <li key={index} className={styles.listData}>
                          {m}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
