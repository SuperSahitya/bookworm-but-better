"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { db } from "~/server/db";
import OrderItem from "~/components/OrderItem";
import Loading from "../loading";

interface Items {
  bookId: string;
  bookName: string;
  unit_price: number;
  quantity: number;
}

interface Order {
  userId: string;
  id?: string;
  items: Items[];
  // items: string;
  paymentStatus: boolean;
  orderedAt?: Date;
  address?: string;
}
interface OrderFromServer {
  userId: string;
  id?: string;
  // items: Items[];
  items: string;
  paymentStatus: boolean;
  orderedAt?: Date;
  address?: string;
}

const OrderPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([] as Order[]);
  const { data: session, status } = useSession();
  async function getOrders() {
    if (status == "authenticated") {
      setLoading(true);
      const response = await fetch("/api/orders");
      const orderArray = (await response.json()) as OrderFromServer[];
      setOrders(
        orderArray.map((order) => ({
          ...order,
          items: JSON.parse(order.items) as Items[],
        }))
      );
      setLoading(false);
    }
  }
  useEffect(() => {
    getOrders().catch((error) => console.error(error));
  }, [session, status]);

  return (
    <>
      <div className={styles.container}>
        {loading && <Loading></Loading>}
        {status != "authenticated" && (
          <div className={styles.logIn} onClick={() => signIn("google")}>
            Log In
          </div>
        )}
        {session && session.user && (
          <>
            <div className={styles.heading}>Orders</div>
            {orders.map((order) => {
              const orderedAt = new Date(order.orderedAt!);
              return (
                <div className={styles.orderContainer} key={order.id}>
                  <div className={styles.date}>
                    <strong>Ordered At: </strong>
                    {` ${orderedAt.toDateString()}  ${orderedAt.getHours()}:${orderedAt.getMinutes()}:${orderedAt.getSeconds()}`}
                  </div>
                  {order.items.map((i) => (
                    <OrderItem
                      key={i.bookId}
                      bookId={`${i.bookId}`}
                      quantity={i.quantity}
                      unit_price={i.unit_price}
                    />
                  ))}
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default OrderPage;
