import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Add a city to a user's favorites
 * @param {Object} cityData
 * @param {string} cityData.name - Name of the city
 * @param {number} cityData.lat - Latitude of the city
 * @param {number} cityData.lon - Longitude of the city
 * @param {number} cityData.userId - ID of the user
 * @returns {Promise<Object>}
 */
export const addCity = async ({ name, lat, lon, userId }) => {
  return prisma.city.create({
    data: { name, lat, lon, userId },
  });
};

/**
 * Get all favorite cities for a user
 * @param {number} userId - ID of the user
 * @returns {Promise<Array>}
 */
export const getCitiesByUser = async (userId) => {
  return prisma.city.findMany({
    where: { userId },
  });
};

/**
 * Delete a favorite city
 * @param {number} cityId - ID of the city to delete
 * @returns {Promise<Object>}
 */
export const deleteCity = async (cityId) => {
  return prisma.city.delete({
    where: { id: cityId },
  });
};
