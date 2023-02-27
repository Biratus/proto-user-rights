import ThemeInitializer from "@/components/theme/ThemeInitiliazer";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import AppBar from "./AppBar";
import AuthContext from "./AuthContext";
import BackgroundImage from "./BackgroundImage";
import "./globals.css";
import MenuDrawer, { GlobalDrawerId } from "./MenuDrawer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" data-theme="light">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ThemeInitializer />
        <div className="drawer">
          <input
            id={GlobalDrawerId}
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            {session && <AppBar />}
            {session && <BackgroundImage />}
            <AuthContext session={session}>{children}</AuthContext>
          </div>
          {session && <MenuDrawer user={session.user} />}
        </div>
      </body>
    </html>
  );
}
