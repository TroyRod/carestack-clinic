import express from "express";
import {
  createPatient,
  getAllPatients,
  getDoctorPatients,
  updatePatient,
  deletePatient,
  getPatientById,
} from "../controllers/patientController.js";

import { protect, adminOnly } from "../helpers/authMiddleware.js";

const router = express.Router();

// CREATE PATIENT
router.post("/", protect, createPatient);

// GET ALL PATIENTS (admin only)
router.get("/", protect, adminOnly, getAllPatients);

// GET DOCTOR'S PATIENTS
router.get("/mine", protect, getDoctorPatients);

// GET SINGLE PATIENT (must be above PUT/DELETE)
router.get("/:id", protect, getPatientById);

// UPDATE PATIENT
router.put("/:id", protect, updatePatient);

// DELETE PATIENT
router.delete("/:id", protect, deletePatient);

export default router;
