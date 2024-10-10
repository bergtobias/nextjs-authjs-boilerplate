import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { type: "email", name: "email", title: "E-mail" },
        password: { type: "password", name: "password", title: "Password" },
      },
      authorize: async ({ email }) => {
        if (!email) return null;
        const user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          return null;
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
});
