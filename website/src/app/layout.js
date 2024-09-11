"use client";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { usePathname } from 'next/navigation';

// export const metadata = {
//   title: "AniVerse",
//   description: "An anime Recommendation app",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/login' && pathname!=='/register';

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <Script src="https://unpkg.com/htmx.org@2.0.0"></Script>
      </head>
      <body>
        <AuthContextProvider>
          {showNavbar && <Navbar />}
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}