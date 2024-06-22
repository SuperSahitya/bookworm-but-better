"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import Profile from "~/components/Profile";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {session && session.user && (
        <div className={styles.container}>
          <Profile></Profile>
        </div>
      )}
      {!session && (
        <div className={styles.container}>
          <div className={styles.signInButton} onClick={() => signIn("google")}>
            Log In
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
