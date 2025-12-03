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
const allowedOrigins = process.env.CLIENT_URL 
  ? [process.env.CLIENT_URL] 
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
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
// ROUTES
// --------------------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/upload", uploadRoutes);

// Serve static files from React app in production
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientBuildPath));
  
  // Serve React app for all non-API routes
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api") && !req.path.startsWith("/uploads")) {
      res.sendFile(path.join(clientBuildPath, "index.html"));
    }
  });
} else {
  // Default test route for development
app.get("/", (req, res) => {
  res.json({ message: "API running successfully" });
});
}

export default app;
