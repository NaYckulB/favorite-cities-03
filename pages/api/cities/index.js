import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next"; // Use getServerSession for better reliability
import { authOptions } from "../auth/[...nextauth]"; // Import your NextAuth options

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Fetch the session from the server
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    console.log("Unauthorized access attempt");
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  const userId = session.user.id; // Extract user ID from session

  if (req.method === "POST") {
    const { name, lat, lon } = req.body;

    if (!name || !lat || !lon) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    try {
      const city = await prisma.city.create({
        data: {
          name,
          lat,
          lon,
          userId, // Use userId from session
        },
      });

      res.status(201).json({ success: true, data: city });
    } catch (error) {
      console.error("Error saving city:", error);
      res.status(500).json({ success: false, error: "Failed to save city" });
    }
  } else if (req.method === "GET") {
    try {
      const cities = await prisma.city.findMany({
        where: { userId }, // Fetch cities for the logged-in user
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ success: true, data: cities });
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ success: false, error: "Failed to fetch cities" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}
