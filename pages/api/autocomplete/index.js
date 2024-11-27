// /pages/api/autocomplete/index.js

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Fetch city suggestions from Google Places Autocomplete API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    // Check if the response is valid
    if (!response.ok) {
      throw new Error("Error fetching data from Google Places API");
    }

    const data = await response.json();

    // Log the response for debugging
    console.log("Autocomplete API Response:", data);

    // If predictions are found, map them to a simpler format
    if (data.predictions) {
      const suggestions = data.predictions.map((prediction) => ({
        name: prediction.description, // The name of the city
        lat: prediction.geometry ? prediction.geometry.location.lat : null, // Latitude (optional)
        lon: prediction.geometry ? prediction.geometry.location.lng : null, // Longitude (optional)
      }));

      res.status(200).json(suggestions); // Return suggestions as JSON
    } else {
      res.status(200).json([]); // Return empty array if no predictions
    }

  } catch (error) {
    console.error("Error fetching autocomplete data:", error);
    res.status(500).json({ error: "Error fetching city suggestions" });
  }
}
