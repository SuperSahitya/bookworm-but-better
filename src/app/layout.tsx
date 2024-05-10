import "~/styles/globals.css";

import { Inter } from "next/font/google";
import AuthProvider from "~/auth/AuthProvider";
import Navbar from "~/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider><Navbar></Navbar>{children}</AuthProvider>
      </body>
    </html>
  );
}
