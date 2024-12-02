/**
 * Save a city to the user's favorites.
 *
 * @param {Object} city - The city object to save.
 * @param {string} city.name - The name of the city.
 * @param {number} city.lat - The latitude of the city.
 * @param {number} city.lon - The longitude of the city.
 * @returns {Promise<Object>} - The saved city data.
 * @throws {Error} - If the request fails.
 */
export const saveCity = async (city) => {
  try {
    const response = await fetch("/api/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(city), // Only send city data
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to save city");
    }

    return data.data; // Return the saved city object
  } catch (error) {
    console.error("Error saving city:", error);
    throw error;
  }
};



/**
 * Delete a city from the user's favorites.
 *
 * @param {number} cityId - The ID of the city to delete.
 * @returns {Promise<boolean>} - Returns true if successful.
 * @throws {Error} - If the request fails.
 */
export const deleteCity = async (cityId) => {
  try {
    const response = await fetch(`/api/cities/${cityId}`, {
      method: "DELETE",
      credentials: "include", // Include cookies for session validation
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to delete city");
    }

    return true; // Successfully deleted
  } catch (error) {
    console.error("Error deleting city:", error);
    throw error;
  }
};

/**
 * Fetch all favorite cities for the logged-in user.
 *
 * @returns {Promise<Array>} - An array of saved city objects.
 * @throws {Error} - If the request fails.
 */
export const fetchFavoriteCities = async () => {
  try {
    const response = await fetch("/api/cities", {
      method: "GET",
      credentials: "include", // Include cookies for session validation
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch favorite cities");
    }

    return data.data; // Return the array of favorite cities
  } catch (error) {
    console.error("Error fetching favorite cities:", error);
    throw error;
  }
};
