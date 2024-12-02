import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth"; // Import the JWT type from next-auth

declare global {
  var prisma: PrismaClient | undefined;

  // Augment the NextAuth types for JWT and Session
  namespace NextAuth {
    interface Session {
      user: {
        id: string; // User ID from Prisma
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

  // Add types for City model
  interface City {
    id: number;
    name: string;
    lat: number;
    lon: number;
    userId: number;
    createdAt: string; // ISO timestamp
  }

  // API Response types
  interface CityResponse {
    success: boolean;
    data?: City | City[];
    error?: string;
  }
}

export {};
