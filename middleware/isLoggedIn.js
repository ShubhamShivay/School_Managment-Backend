import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
  // Get token from hader
  const token = getTokenFromHeader(req);
  console.log(token);
  // Verify the token
  const decodedUser = verifyToken(token);
  console.log(decodedUser);
  // Save the user into req obj
  if (!decodedUser) {
    // console.log("Token Expired/Invalid");
    throw new Error("Token expired, Please login again");
  } else {
    req.userAuthId = decodedUser?._id;
    // console.log(req.userAuthId._id);
    next();
  }
};
