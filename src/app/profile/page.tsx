"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import Profile from "~/components/Profile";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {session ? (
        <Profile />
      ) : (
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Welcome Back</h1>
          <p className={styles.loginDesc}>
            Please sign in to view your profile and orders.
          </p>
          <div className={styles.signInButton} onClick={() => signIn("google")}>
            Sign In with Google
          </div>
          <Link href="/" className={styles.backHome}>
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
