require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization") || req.header("authorization");

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied",
      });
    }
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid format",
      });
    }
    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = auth;
