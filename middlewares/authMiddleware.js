import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token-based
export const requireSignIn = async (req, res, next) => {
  try {
    // Ensure the Authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; // Save the decoded token data in the request object
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    
    // Ensure the user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    
    // Check if the user has admin privileges (role 1 for admin)
    if (user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized access, admin role required",
      });
    } else {
      next(); // Allow access to the route
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
