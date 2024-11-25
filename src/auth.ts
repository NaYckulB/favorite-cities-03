import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Please enter both username and password.");
          }
      
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });
      
          if (!user) {
            throw new Error("No account found with that username.");
          }
      
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
      
          if (!isValidPassword) {
            throw new Error("Invalid username or password.");
          }
      
          return { id: user.id, name: user.username, email: user.email };
        } catch (error) {
          console.error("Error in authorize function:", error.message);
          throw new Error(error.message || "Authentication failed.");
        }
      },
      
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      };
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login", // Redirect here if not authenticated
    error: "/login",  // Display friendly error messages on login page
  },
});
