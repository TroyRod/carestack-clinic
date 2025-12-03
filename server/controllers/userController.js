import User from "../models/user.js";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
};

// @route   POST /api/users/signup
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, customId } = req.body;

    // EMAIL VALIDATION (must contain @ and end with .com)
    if (!email || !email.includes("@") || !email.endsWith(".com")) {
      return res
        .status(400)
        .json({ message: "Invalid email. Email must contain @ and end with .com" });
    }


    //require password length >=10
    if (!password || password.length < 10) {
      return res
        .status(400)
        .json({ message: "Password must be at least 10 characters long" });
    }

     // Doctor or caregiver MUST have customId
    if ((role === "doctor" || role === "caregiver")) {
      if (!customId || customId < 100 || customId > 999) {
        return res.status(400).json({
          message: "Doctors and caregivers must have a 3-digit customId (100–999)"
        });
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password, role, customId });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        customId: user.customId
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        customId: user.customId
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   GET /api/users (Admin Only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
