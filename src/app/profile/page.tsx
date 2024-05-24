"use client";
import { useSession } from "next-auth/react";
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
        {!session && <Link href="/api/auth/login"></Link>}
      </>
    );
  }
};

export default ProfilePage;
