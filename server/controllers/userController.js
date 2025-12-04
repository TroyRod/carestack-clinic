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

    const token = generateToken(user);
    
    res.json({
      message: "Login successful",
      token: token,
      role: user.role, // For backward compatibility
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

// @route   GET /api/users/doctors (Admin Only) - Get all doctors with their patients
export const getDoctorsWithPatients = async (req, res) => {
  try {
    const Patient = (await import("../models/Patient.js")).default;
    
    const doctors = await User.find({ role: "doctor" }).select("-password");
    
    const doctorsWithPatients = await Promise.all(
      doctors.map(async (doctor) => {
        const patients = await Patient.find({ doctor: doctor._id })
          .populate("caregiver", "name email role")
          .select("-doctor");
        
        return {
          ...doctor.toObject(),
          patients: patients || [],
          patientCount: patients?.length || 0,
        };
      })
    );
    
    res.json(doctorsWithPatients);
  } catch (err) {
    console.error("Get doctors with patients error:", err);
    res.status(500).json({ message: err.message });
  }
};

// @route   PUT /api/users/:id/convert-to-admin (Admin Only) - Convert caregiver to admin
export const convertToAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already an admin" });
    }
    
    // Update role to admin and remove customId
    user.role = "admin";
    user.customId = null; // Remove customId for admin (not required for admin role)
    await user.save();
    
    res.json({
      message: "User converted to admin successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Convert to admin error:", err);
    res.status(500).json({ message: err.message });
  }
};

// @route   DELETE /api/users/:id (Admin Only) - Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot delete admin user" });
    }
    
    // Check if doctor has patients - optionally handle patient reassignment
    const Patient = (await import("../models/Patient.js")).default;
    const patientCount = await Patient.countDocuments({ doctor: userId });
    
    if (patientCount > 0) {
      // Option 1: Delete all patients of this doctor
      await Patient.deleteMany({ doctor: userId });
      // Option 2: Or reassign to another doctor (you can implement this)
    }
    
    // Delete the doctor
    await User.findByIdAndDelete(userId);
    
    res.json({
      message: `Doctor deleted successfully. ${patientCount} patient(s) were also removed.`,
    });
  } catch (err) {
    console.error("Delete doctor error:", err);
    res.status(500).json({ message: err.message });
  }
};
