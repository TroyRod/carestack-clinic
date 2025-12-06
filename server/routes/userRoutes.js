import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getDoctors,
  deleteUser,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../helpers/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", protect, adminOnly, getUsers);
router.get("/doctors", protect, adminOnly, getDoctors);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
