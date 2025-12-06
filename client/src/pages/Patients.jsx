import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import "./Patients.css"; // ← IMPORTANT
import anonymousPhoto from "../assets/anonymous.webp";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  // FETCH PATIENTS
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const role = localStorage.getItem("role");

        const res =
          role === "admin"
            ? await API.get("/patients")
            : await API.get("/patients/mine");

        setPatients(res.data);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      }
    };

    fetchPatients();
  }, []);

  // DELETE PATIENT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;

    try {
      await API.delete(`/patients/${id}`);
      setPatients(patients.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="patients-page">
      <div className="patients-header">
        <h1>Patients</h1>
        <Link to="/create-patient" className="add-btn">
          + Add Patient
        </Link>
      </div>

      <div className="patients-grid">
        {patients.map((p) => (
          <div key={p._id} className="patient-card">
            
            <img
              src={
                p.image ||
                anonymousPhoto
              }
              alt="Patient"
              className="patient-image"
            />

            <h2 className="patient-name">{p.name}</h2>

            <p className="patient-detail">
              <strong>Patient ID:</strong> {p.patientId}
            </p>
            <p className="patient-detail">
              <strong>Doctor ID:</strong> {p.doctor?.customId || "N/A"}
            </p>
            <p className="patient-detail">
              <strong>Age:</strong> {p.age}
            </p>
            <p className="patient-detail">
              <strong>Diagnosis:</strong> {p.diagnosis}
            </p>

            {/* MEDICATION SECTION */}
            <div className="med-section">
              <strong>Medications:</strong>
              {p.medications?.length > 0 ? (
                <ul>
                  {p.medications.map((m, i) => (
                    <li key={i}>
                      <strong>{m.name}</strong> — {m.dosage} ({m.time})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>

            <div className="button-row">
              <Link to={`/edit-patient/${p._id}`} className="edit-btn">
                Edit
              </Link>

              <button
                onClick={() => handleDelete(p._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>

            <Link to={`/medications/${p._id}`} className="med-btn">
              View Medication Details
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}
