"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { Updation, useCartStore } from "~/components/Navbar";
import { useSession } from "next-auth/react";

interface CartItem {
  userId?: string;
  id: string;
  name: string;
  author: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const Product = ({ params }: { params: { id: number } }) => {
  const { data: session, status } = useSession();
  const cart = useCartStore((state) => state.cart);

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
          `/api/product/${params.id}`
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

  const setCart = useCartStore((state) => state.setCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleAddToCart = (data: Data) => {
    let itemExists = false;

    // eslint-disable-next-line prefer-const
    let updatedCart: CartItem[] = [];

    const j: CartItem[] = cart.map((item) => {
      if (item.id === data.id.toString()) {
        itemExists = true;
        updateQuantity(data.id.toString(), Updation.Increase);
      }
      return item;
    });

    if (!itemExists) {
      updatedCart.push({
        userId: session?.user.id,
        id: data.id.toString(),
        name: data.name,
        author: data.author,
        price: data.price,
        imageUrl: data.imageUrl,
        quantity: 1,
      });
    }

    setCart(updatedCart);
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
                <div className={styles.productPrice}>{`₹${data.price.toFixed(
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
