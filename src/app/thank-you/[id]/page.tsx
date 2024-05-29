"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { db } from "~/server/db";

const Thanks = ({ params }: { params: { id: string } }) => {
  const orderId = params.id;
  const { data: session, status } = useSession();
  useEffect(() => {
    async function getOrders(orderId: string) {
      console.log(orderId);
    }
  }, []);

  return (
    <>
      <div className={styles.container}></div>
    </>
  );
};

export default Thanks;
