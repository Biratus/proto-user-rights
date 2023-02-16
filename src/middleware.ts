// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UtilisateurWithRights } from "./lib/db/repository/UserRepository";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log("middleware: ", req.nextauth.token);
    // return NextResponse.rewrite(
    //   new URL(`/?cause=unauthorized&url=${req.nextUrl.pathname}`, req.url)
    // );
    const roles: string[] =
      (req.nextauth.token!.user! as UtilisateurWithRights).roles || [];
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      !roles.includes("ADMINISTRATEUR")
    )
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    // if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
    //   return NextResponse.rewrite(
    //     new URL("/auth/login?message=You Are Not Authorized!", req.url)
    //   );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
