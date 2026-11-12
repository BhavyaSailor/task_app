require("dotenv").config();
const User = require("../models/user.models");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role: "user",
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ 
      id: user._id,
      role: user.role
     }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -__v ",
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role: "admin",
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered",
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password -__v ");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const bootstrapFirstAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields required");
    }

    // Check if any admin exists
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      res.status(403);
      throw new Error("Admin already exists. Use /register-admin endpoint with admin auth.");
    }

    // Check if user email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role: "admin",
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "First admin user created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, profile, registerAdmin, updateUserRole, bootstrapFirstAdmin };
