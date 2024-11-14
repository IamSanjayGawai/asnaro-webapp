import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Member from "./models/Member.js";

export const adminMiddleware = async (req, res, next) => {
  console.log("adminMiddleware started");
  const authHeader = req.headers.authorization;
  console.log(authHeader, "authHeader");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    console.log(token, "token");
    console.log(process.env.JWT_SECRET, "secret");
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded, "decoded");

    // Check if the user is an admin
    const admin = await Member.findById(decoded.userId);
    console.log(admin, "admin");

    if (!admin || admin.role !== "admin") {
      // If the user is not an admin
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "No admin found with this id or insufficient privileges",
      });
    }

    // Add admin information to the request
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
