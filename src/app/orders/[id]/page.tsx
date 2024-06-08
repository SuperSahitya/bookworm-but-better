"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { db } from "~/server/db";

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

const Thanks = ({ params }: { params: { id: string } }) => {
  const orderId = params.id;
  const [orders, setOrders] = useState([] as Order[]);
  const { data: session, status } = useSession();
  async function getOrders(orderId: string) {
    console.log(orderId);
    const response = await fetch("/api/orders");
    const orderArray = (await response.json()) as OrderFromServer[];
    // console.log(orderArray);
    setOrders(
      orderArray.map((order) => ({
        ...order,
        items: JSON.parse(order.items) as Items[],
      }))
    );
    console.log(typeof orders[0]?.address);
  }
  useEffect(() => {
    getOrders(orderId).catch((error) => console.error(error));
  }, [session]);

  return (
    <>
      <div className={styles.container}>
        <div>Order</div>
        {orders[0]?.items.map((i) => {
          return (
            <div key={i.bookId}>
              <div>{i.bookName}</div>
              <div>{i.unit_price}</div>
              <div>{i.quantity}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Thanks;
