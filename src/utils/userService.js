import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/**
 * Create a new user with hashed password
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<Object>}
 */

export const createUser = async (username, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  return prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  });
};



/**
 * Find a user by username
 * @param {string} username
 * @returns {Promise<Object | null>}
 */
export const findUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username },
  });
};
