import { UtilisateurWithRights } from "@/lib/db/repository/UserRepository";
import "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth/core/types" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }

  interface User extends AdapterUser, UtilisateurWithRights {
    id: number;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    user?: User;
  }
}
