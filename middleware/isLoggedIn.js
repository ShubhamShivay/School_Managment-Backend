import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {

	const token = getTokenFromHeader(req); // Get token from hader

	if (!token) {
		return res.json({
			status: 401,
			message: "No token found",
		});
	}

	const decodedUser = verifyToken(token); // verify if there is token
	if (!decodedUser) {
		return res.json({
			status: 401,
			message: "ERROR AUTHENTICATING",
		});
	} else {
		req.user = decodedUser?.payload;
		next();
	}
};