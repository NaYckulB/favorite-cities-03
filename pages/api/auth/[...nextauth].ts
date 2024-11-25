// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { findUserByUsername } from "@/utils/userService"; // Adjust import path if needed

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Check if the user exists in the database
        const user = await findUserByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
          return { id: user.id, username: user.username, email: user.email }; // Return user data if authentication is successful
        }
        return null; // Return null if the user isn't found or password is incorrect
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to login page if unauthenticated
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
};

export default NextAuth(authOptions);
