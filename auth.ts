import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentailsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/register",
  },
  providers: [
    CredentailsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (
          user &&
          bcrypt.compareSync(
            credentials.password as string,
            user.password as string
          )
        ) {
          if (!user.emailVerified) {
            return { error: "Email not verified" };
          }
          return { name: user.name, email: user.email };
        } else {
          return { error: "Invalid email or password" };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });
        if (!user.email) {
          throw new Error("no email id present in google");
        }

        if (!existingUser) {
          // Create a new user in the database
          await prisma.user.create({
            data: {
              name: String(user.name),
              email: String(user.email),
              authProvider: "GOOGLE",
              emailVerified: true,
            },
          });
        }
      } else if (account?.provider === "credentials") {
        if ((user as any).error) {
          throw new Error((user as any).error as string);
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
