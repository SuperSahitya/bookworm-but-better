"use client";
import React from "react";
import styles from "./profile.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${session.user.image})`,
          }}
        ></div>
        <div className={styles.profileData}>
          <div className={styles.userName}>{session.user.name}</div>
          <div className={styles.email}>{session.user.email}</div>
        </div>
      </div>

      <div className={styles.sections}>
        <Link href="/orders" className={styles.sectionCard}>
          <div className={styles.sectionTitle}>My Orders</div>
          <div className={styles.sectionDesc}>
            View your order history and tracking details.
          </div>
        </Link>

        <Link href="/search" className={styles.sectionCard}>
          <div className={styles.sectionTitle}>Browse Books</div>
          <div className={styles.sectionDesc}>
            Explore our collection and find your next read.
          </div>
        </Link>

        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>Settings</div>
          <div className={styles.sectionDesc}>
            Manage your account preferences and security.
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>Support</div>
          <div className={styles.sectionDesc}>
            Need help? Contact our customer service.
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/" style={{ fontWeight: 600, textDecoration: "underline" }}>
          Back to Home
        </Link>
        <div className={styles.logButton} onClick={() => signOut()}>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Profile;
