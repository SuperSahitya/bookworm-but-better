"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const { data: session, status } = useSession();
  if (session && session.user) {
    return (
      <>
        <div>{`userEmail: ${session.user.email}`}</div>
        <div>{`userEmail: ${session.user.email}`}</div>
        <div>{`userEmail: ${session.user.email}`}</div>
        <div>{`userEmail: ${session.user.email}`}</div>
        <div>{`userEmail: ${session.user.email}`}</div>
        <div>{`userEmail: ${session.user.email}`}</div>
        <div>{`userEmail: ${session.user.email}`}</div>
        <div>{`userId: ${session.user.id}`}</div>
        <div>{`username: ${session.user.name}`}</div>
        <div
          style={{
            background: `url(${session.user.image!})`,
            height: 50,
            width: 50,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* {session.user.image ? session.user.image : "no data lol"} */}
        </div>
      </>
    );
  }
};

export default Profile;
