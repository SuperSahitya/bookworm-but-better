"use client"
import React from "react";
import { SessionProvider } from "next-auth/react";

interface children {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: children) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
