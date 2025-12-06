// server/express.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// STATIC: SERVE THE UPLOADS FOLDER *CORRECTLY*
// --------------------------------------------------
// Exposes files like:
// http://localhost:3000/uploads/image-12345.jpg
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// --------------------------------------------------
// --------------------------------------------------
// ROUTES (MUST BE BEFORE STATIC/CATCH-ALL)
// --------------------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/upload", uploadRoutes);

// --------------------------------------------------
// STATIC: SERVE FRONTEND BUILD IN PRODUCTION
// --------------------------------------------------
// When deploying full-stack on one host (e.g., Render), serve the Vite build
// from the client/dist folder. In development, Vite dev server handles this.
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist/app");
  app.use(express.static(distPath));

  // For React Router: send index.html for unmatched routes
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Default test route (only if not in production)
app.get("/", (req, res) => {
  res.json({ message: "API running successfully" });
});

export default app;
