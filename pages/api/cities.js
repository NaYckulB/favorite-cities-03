import { addCity, getCitiesByUser, deleteCity } from "@/utils/cityService";

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case "POST": // Add a city
      try {
        const { name, lat, lon, userId } = body;
        if (!name || !lat || !lon || !userId) {
          return res.status(400).json({ error: "Missing required fields" });
        }
        const city = await addCity({ name, lat, lon, userId });
        res.status(201).json(city);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "GET": // Get cities by user
      try {
        const { userId } = query;
        if (!userId) {
          return res.status(400).json({ error: "Missing userId" });
        }
        const cities = await getCitiesByUser(parseInt(userId, 10));
        res.status(200).json(cities);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "DELETE": // Delete a city
      try {
        const { cityId } = query;
        if (!cityId) {
          return res.status(400).json({ error: "Missing cityId" });
        }
        const city = await deleteCity(parseInt(cityId, 10));
        res.status(200).json(city);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
