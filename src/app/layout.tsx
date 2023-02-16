"use client";

import { SessionProvider } from "next-auth/react";
import AppBar from "./AppBar";
import "./globals.css";
import MenuDrawer, { GlobalDrawerId } from "./MenuDrawer";

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
          <div className="drawer">
            <input
              id={GlobalDrawerId}
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content">{children}</div>
            <MenuDrawer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
