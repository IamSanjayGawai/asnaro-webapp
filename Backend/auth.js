import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "./models/User.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "No user found with this id",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
