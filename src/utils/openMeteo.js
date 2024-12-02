/**
 * Fetches the current weather for a given set of coordinates using the Open Meteo API.
 * 
 * @param {number} latitude - The latitude of the city.
 * @param {number} longitude - The longitude of the city.
 * @returns {object|null} - An object containing weather details, or null if an error occurs.
 */
export async function fetchCityWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.current_weather) {
      return data.current_weather;
    } else {
      throw new Error("Weather data not found");
    }
  } catch (error) {
    console.error("Error fetching city weather:", error);
    return null;
  }
}
