import { userMatch } from "@/lib/auth";
import UserRepository from "@/lib/db/repository/UserRepository";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // https://next-auth.js.org/providers/overview
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Identifiant et mot de passe",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Identifiant",
          type: "text",
          placeholder: "identifiant...",
        },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // TODO prisma
        try {
          // If no error and we have user data, return it

          const user = await UserRepository.byUsername(credentials.username);
          console.log("user", user);
          return user ? userMatch(credentials, user) : null;
        } catch (e) {
          console.log(e);
          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    signIn: async ({ user }) => {
      return true;
    },
    jwt: async ({ token, user }) => {
      // first time jwt callback is run
      if (user) {
        token.userId = user.id;
        // token.clientId = user.client[0].id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.userId = token.userId;
      // session.clientId = token.clientId;
      return session;
    },
  },
};

export default NextAuth(authOptions);
