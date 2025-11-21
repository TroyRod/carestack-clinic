import express from "express";
import cors from "cors";
import medicationRoutes from "./routes/medicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes AFTER middleware
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medications", medicationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

export default app;
