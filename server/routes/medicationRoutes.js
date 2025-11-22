// server/routes/medicationRoutes.js
import express from "express";
import medications from "../data/medications.js";
import { protect } from "../helpers/authMiddleware.js";

const router = express.Router();

/**
 * GET /api/medications
 * Returns the static medication library.
 * Any logged-in user (doctor / admin / caregiver) can read this.
 */
router.get("/", protect, (req, res) => {
  res.json(medications);
});

export default router;
