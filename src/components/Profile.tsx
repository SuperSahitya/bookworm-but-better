"use client";
import React, { useContext } from "react";
import styles from "./profile.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {/* make it better */}
      <div className={styles.profileContainer}>
        <div
          className={styles.image}
          style={{ background: `url(${session?.user.image})` }}
        ></div>
        <div className={styles.profileData}>
          {session ? (
            <div className={styles.userName}>
              {session ? session.user.name : ""}
            </div>
          ) : (
            ""
          )}
          {session ? (
            <div className={styles.email}>
              {session ? session.user.email : ""}
            </div>
          ) : (
            ""
          )}
        </div>
        {session ? (
          <Link href={"/api/auth/signout"} className={styles.logButton}>
            Log Out
          </Link>
        ) : (
          <Link href={"/api/auth/signin"} className={styles.logButton}>
            Log In
          </Link>
        )}
      </div>
    </>
  );
};

export default Profile;
