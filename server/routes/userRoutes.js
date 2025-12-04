import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getDoctorsWithPatients,
  convertToAdmin,
  deleteDoctor,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../helpers/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", protect, adminOnly, getUsers);
router.get("/doctors", protect, adminOnly, getDoctorsWithPatients);
router.put("/:id/convert-to-admin", protect, adminOnly, convertToAdmin);
router.delete("/:id", protect, adminOnly, deleteDoctor);

export default router;
