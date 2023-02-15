"use client";

import { SessionProvider } from "next-auth/react";
import AppBar from "./AppBar";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProvider>
          <AppBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
