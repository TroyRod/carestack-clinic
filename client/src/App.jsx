import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages for code splitting and performance
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Patients = lazy(() => import("./pages/Patients"));
const Signup = lazy(() => import("./pages/Signup"));
const CreatePatient = lazy(() => import("./pages/CreatePatient"));
const EditPatient = lazy(() => import("./pages/EditPatient"));
const SignupDoctor = lazy(() => import("./pages/SignupDoctor"));
const SignupCaregiver = lazy(() => import("./pages/SignupCaregiver"));
const Medications = lazy(() => import("./pages/Medications"));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    fontSize: '1.2rem',
    color: 'var(--deep-blue)'
  }}>
    Loading...
  </div>
);

export default function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </div>
    </>
  );
}
