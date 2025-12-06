import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./ManageDoctors.css";

export default function ManageDoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
          setError("Access denied. Admin only.");
          setLoading(false);
          return;
        }

        const res = await API.get("/users");
        // Filter for doctors only
        const doctorsOnly = res.data.filter((user) => user.role === "doctor");
        setDoctors(doctorsOnly);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId, doctorName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete doctor ${doctorName}? This will not delete their assigned patients.`
      )
    ) {
      return;
    }

    try {
      await API.delete(`/users/${doctorId}`);
      setDoctors(doctors.filter((d) => d._id !== doctorId));
      alert("Doctor deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete doctor");
    }
  };

  if (loading) {
    return (
      <div className="manage-doctors-page">
        <p className="loading-text">Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-doctors-page">
        <p className="error-text">{error}</p>
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="manage-doctors-page">
      <div className="doctors-header">
        <h1>Manage Doctors</h1>
        <button onClick={() => navigate("/signup")} className="add-btn">
          + Add Doctor
        </button>
      </div>

      <div className="doctors-container">
        {doctors.length === 0 ? (
          <p className="no-data">No doctors found</p>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
                <div className="doctor-info">
                  <h2 className="doctor-name">{doctor.name}</h2>

                  <p className="doctor-detail">
                    <strong>Doctor ID:</strong> {doctor.customId || "N/A"}
                  </p>

                  <p className="doctor-detail">
                    <strong>Email:</strong> {doctor.email}
                  </p>

                  <p className="doctor-detail">
                    <strong>Role:</strong> {doctor.role}
                  </p>

                  <p className="doctor-detail">
                    <strong>Status:</strong>
                    <span className="status-badge active">Active</span>
                  </p>
                </div>

                <div className="button-row">
                  <button
                    onClick={() =>
                      handleDelete(doctor._id, doctor.name)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={() => navigate("/dashboard")} className="back-to-dashboard">
        ← Back to Dashboard
      </button>
    </div>
  );
}
