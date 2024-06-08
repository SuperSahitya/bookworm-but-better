"use client";
import React, { useContext } from "react";
import styles from "./profile.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

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
          <div
            className={styles.logButton}
            onClick={async () => {
              try {
                await signOut();
                localStorage.setItem("guestCart", JSON.stringify([]));
                console.log("hello");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Log Out
          </div>
        ) : (
          <div className={styles.logButton} onClick={() => signIn()}>
            Log In
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
