// "use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";

export const metadata = {
  title: "AniVerse",
  description: "An anime Recommendation app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
      </head>
      <body >
        <AuthContextProvider>
          <Navbar/>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}