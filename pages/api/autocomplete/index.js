export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Fetch city suggestions from Google Places Autocomplete API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(regions)&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Error fetching data from Google Places API");
    }

    const data = await response.json();
    console.log("Autocomplete API Response:", data);

    if (data.predictions) {
      // Map predictions and fetch geometry details for each place
      const suggestions = await Promise.all(
        data.predictions.map(async (prediction) => {
          try {
            const placeDetailsResponse = await fetch(
              `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=geometry&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            );

            if (!placeDetailsResponse.ok) {
              throw new Error("Failed to fetch place details");
            }

            const placeDetailsData = await placeDetailsResponse.json();
            console.log("Place Details Response:", placeDetailsData);

            const lat = placeDetailsData.result?.geometry?.location?.lat || null;
            const lng = placeDetailsData.result?.geometry?.location?.lng || null;

            if (lat === null || lng === null) {
              console.warn("Incomplete geometry data for:", prediction.description);
              return null; // Exclude invalid entries
            }

            return {
              name: prediction.description,
              lat,
              lng,
            };
          } catch (error) {
            console.error("Error fetching place details:", error.message);
            return null; // Exclude entries with errors
          }
        })
      );

      // Filter out null values
      const validSuggestions = suggestions.filter((s) => s !== null);

      res.status(200).json(validSuggestions);
    } else {
      res.status(200).json([]); // Return empty array if no predictions
    }
  } catch (error) {
    console.error("Error fetching autocomplete data:", error.message);
    res.status(500).json({ error: "Error fetching city suggestions" });
  }
}
