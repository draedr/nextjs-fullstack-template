import 'server-only';

import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import prisma from "@/lib/prisma"; 
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@/lib/helpers/auth-helper";

const config: NextAuthConfig = {
  debug: true,
  adapter: PrismaAdapter(prisma), 
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name;
      }
      return session;
    },
  },
};

export { config };

export const { handlers, auth, signIn, signOut } = NextAuth(config);

