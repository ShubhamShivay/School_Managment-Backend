import jwt from "jsonwebtoken";

// Generate Token and save it in cookie

/**
 * Generates a JWT token for the given user _id and saves it in the user's
 * cookie. The token is valid for 3 days.
 *
 * @param {string} _id - The user's _id
 * @returns {string} The generated JWT token
 */
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export default generateToken;
