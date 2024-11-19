/**
 * Fetches the coordinates of a city using the Open Meteo Geocoding API.
 * 
 * @param {string} cityName - The name of the city to search for.
 * @returns {object|null} - An object containing the coordinates and place name, or null if an error occurs.
 */
export async function fetchCityCoordinates(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

      if (data.results && data.results.length > 0) {
      const city = data.results[0];
      const coordinates = [city.longitude, city.latitude];
      const placeName = `${city.name}, ${city.country}`;

      return {
        coordinates,
        placeName,
      };
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    return null;
  }
}
