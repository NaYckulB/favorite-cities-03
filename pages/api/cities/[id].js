import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  const userId = parseInt(session.user.id, 10);
  const cityId = parseInt(req.query.id, 10);

  if (req.method === "DELETE") {
    try {
      const city = await prisma.city.findUnique({
        where: { id: cityId },
      });

      if (!city || city.userId !== userId) {
        return res.status(403).json({ success: false, error: "Unauthorized or City not found" });
      }

      await prisma.city.delete({
        where: { id: cityId },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting city:", error);
      res.status(500).json({ success: false, error: "Failed to delete city" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}
