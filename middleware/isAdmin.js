import Admin from "../models/Admin.js";

export const isAdmin = async (req, res, next) => {
  //! Find the login user
  // console.log("userAuthId", req.userAuthId._id);
  const admin = await Admin.findById(req.userAuthId?._id);
  console.log("user", admin);
  //! Check user if Admin?
  // if (!admin.role === "Admin") {
  //   return res.status(401).json({
  //     status: "Failed",
  //     message: "Unauthorized, Access Denied, Admin only",
  //   });
  // }
  return next();
};
