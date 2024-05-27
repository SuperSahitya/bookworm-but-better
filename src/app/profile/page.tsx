"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import Profile from "~/components/Profile";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  if (session && session.user) {
    return (
      <>
        {session && session.user && (
          <div className={styles.container}>
            <Profile></Profile>
          </div>
        )}
        {!session && <div onClick={() => signIn()}></div>}
      </>
    );
  }
};

export default ProfilePage;
