import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
  //! Find the login user
  console.log("userAuthId", req.userAuthId._id);
  const user = await User.findById(req.userAuthId?._id);
  console.log("user", user);
  //! Check user if Admin?
  if (!user.isAdmin) {
    return res.status(401).json({
      status: "Failed",
      message: "Unauthorized, Access Denied, Admin only",
    });
  }
  return next();
};
