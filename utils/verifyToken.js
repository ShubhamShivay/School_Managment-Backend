import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return null;
    } else {
      return user;
    }
  });
};
