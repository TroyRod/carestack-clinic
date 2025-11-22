import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Signup from "./pages/Signup";
import CreatePatient from "./pages/CreatePatient";
import EditPatient from "./pages/EditPatient";
import SignupDoctor from "./pages/SignupDoctor";
import SignupCaregiver from "./pages/SignupCaregiver";
import Medications from "./pages/Medications";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-doctor" element={<SignupDoctor />} />
          <Route path="/signup-caregiver" element={<SignupCaregiver />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-patient"
            element={
              <ProtectedRoute>
                <CreatePatient />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-patient/:id"
            element={
              <ProtectedRoute>
                <EditPatient />
              </ProtectedRoute>
            }
          />

          <Route
            path="/medications/:patientId"
            element={
              <ProtectedRoute>
                <Medications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <Signup />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
