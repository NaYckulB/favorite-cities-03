import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.city.delete({ where: { id: parseInt(id, 10) } });
      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting city:", error);
      return res.status(500).json({ error: "Failed to delete city" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
