import express from "express";
import {
  createMedication,
  getMedicationsByPatient,
  updateMedication,
  deleteMedication,
  getAllMedications,
  getMedicationById
} from "../controllers/medicationController.js";

import { protect, adminOnly } from "../helpers/authMiddleware.js";

const router = express.Router();

// CREATE medication (doctor/admin)
router.post("/", protect, createMedication);

// ADMIN: GET ALL medications
router.get("/", protect, adminOnly, getAllMedications);

// GET medication by ID
router.get("/single/:id", protect, getMedicationById);

// GET ALL meds for a specific patient
router.get("/:patientId", protect, getMedicationsByPatient);

// UPDATE medication
router.put("/:id", protect, updateMedication);

// DELETE medication
router.delete("/:id", protect, deleteMedication);

export default router;
