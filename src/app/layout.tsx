import "~/styles/globals.css";

import { Outfit, Rye } from "next/font/google";
import AuthProvider from "~/auth/AuthProvider";
import Navbar from "~/components/Navbar";

const rye = Rye({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
  title: "Bookworm",
  description: "Get the best books known to man.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rye.className}>
        <AuthProvider>
          <Navbar></Navbar>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
