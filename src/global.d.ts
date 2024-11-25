import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth"; // Import the JWT type from next-auth

declare global {
  var prisma: PrismaClient | undefined;

  // Augment the NextAuth types for JWT and Session
  namespace NextAuth {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
      };
    }

    interface JWT {
      id: string;
      name: string;
      email: string;
    }
  }
}

export {};
