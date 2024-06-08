"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { db } from "~/server/db";
import OrderItem from "~/components/OrderItem";

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

const Thanks = () => {
  const [orders, setOrders] = useState([] as Order[]);
  const { data: session, status } = useSession();
  async function getOrders() {
    const response = await fetch("/api/orders");
    const orderArray = (await response.json()) as OrderFromServer[];
    setOrders(
      orderArray.map((order) => ({
        ...order,
        items: JSON.parse(order.items) as Items[],
      }))
    );
  }
  useEffect(() => {
    getOrders().catch((error) => console.error(error));
  }, [session]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>Orders</div>
        {/* <OrderItem bookId={"111"} quantity={11} unit_price={1200}></OrderItem> */}
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
        {/* {orders.map((order) =>
          order.items.map((i) => (
            <div key={i.bookId}>
              <div>{i.bookName}</div>
              <div>{i.unit_price}</div>
              <div>{i.quantity}</div>
            </div>
          ))
        )} */}
      </div>
    </>
  );
};

export default Thanks;
