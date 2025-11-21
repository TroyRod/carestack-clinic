import express from "express";
import {
  createPatient,
  getAllPatients,
  getDoctorPatients,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

import { protect, adminOnly } from "../helpers/authMiddleware.js";

const router = express.Router();

// CREATE PATIENT — admin + doctors
router.post("/", protect, createPatient);

// GET ALL PATIENTS — admin only
router.get("/", protect, adminOnly, getAllPatients);

// GET PATIENTS FOR LOGGED-IN DOCTOR
router.get("/mine", protect, getDoctorPatients);

// UPDATE PATIENT
router.put("/:id", protect, updatePatient);

// DELETE PATIENT
router.delete("/:id", protect, deletePatient);

export default router;
