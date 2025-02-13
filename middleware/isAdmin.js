import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isAdmin = (req, res, next) => {
  const token = getTokenFromHeader(req); // Get token from hader

  if (!token) {
    return res.json({
      status: 401,
      message: "No token found",
    });
  }

  const decodedUser = verifyToken(token); // verify if there is token
  // console.log("user", decodedUser?.role);
  // console.log(decodedUser.user);
  if (!decodedUser) {
    return res.json({
      status: 401,
      message: "ERROR AUTHENTICATING",
    });
  } else {
    if (decodedUser?.user?.role !== "Admin") {
      return res.json({
        status: 401,
        message: "User is not an admin",
        role: decodedUser?.payload?.role,
      });
    } else {
      req.user = decodedUser?.user;
      next();
    }
  }
};
