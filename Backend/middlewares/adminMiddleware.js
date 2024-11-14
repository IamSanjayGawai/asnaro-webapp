import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Member from "../models/Member.js";

export const adminMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("auth middleware", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Member.findById(decoded.userId);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "No user found with this id",
      });
    }

    req.user = user;

    // Check for admin role
    if (user.role !== 'admin') {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "You do not have the required admin role",
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
