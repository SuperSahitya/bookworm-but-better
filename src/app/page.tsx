"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import styles from "./index.module.css";

export default function Home() {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <>
        <div>{status}</div>
        <div>You are not logged in</div>
        <Link href="/api/auth/signin">Log in</Link>
      </>
    );
  }

  return (
    <>
      <div>{status}</div>
      <div>Hello, {session.user.name}</div>
      <div>Email: {session.user.email}</div>
      <Link href="/api/auth/signout">Sign Out</Link>
    </>
  );
}
