import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  // Fetch patients on load
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
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Patients</h1>
        <Link to="/create-patient" style={styles.addBtn}>
          + Add Patient
        </Link>
      </div>

      <div style={styles.grid}>
        {patients.map((p) => (
          <div key={p._id} style={styles.card}>
            <img
              src={
                p.image ||
                "https://via.placeholder.com/300x150?text=Patient+Image"
              }
              alt="Patient"
              style={styles.image}
            />

            <h2 style={styles.patientName}>{p.name}</h2>

            <p style={styles.details}>
              <strong>Age:</strong> {p.age}
            </p>
            <p style={styles.details}>
              <strong>Diagnosis:</strong> {p.diagnosis}
            </p>

            {/* FULL MEDICATION LIST */}
            <div style={styles.medSection}>
              <strong>Medications:</strong>
              {p.medications?.length > 0 ? (
                <ul style={styles.medList}>
                  {p.medications.map((m, i) => (
                    <li key={i}>
                      <strong>{m.name}</strong> — {m.dosage} ({m.time})
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ marginTop: "5px" }}>None</p>
              )}
            </div>

            <div style={styles.buttonRow}>
              <Link to={`/edit-patient/${p._id}`} style={styles.editBtn}>
                Edit
              </Link>

              <button
                onClick={() => handleDelete(p._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>

            <Link to={`/medications/${p._id}`} style={styles.medBtn}>
              View Medication Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

//
// STYLES
//
const styles = {
  page: {
    padding: "20px 40px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: {
    fontSize: "2rem",
    margin: 0,
    color: "white",
  },
  addBtn: {
    textDecoration: "none",
    background: "#007bff",
    color: "white",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  patientName: {
    margin: "0",
    fontSize: "1.4rem",
    color: "#0044cc",
    fontWeight: "600",
  },
  details: {
    margin: "3px 0",
    fontSize: "14px",
  },
  medSection: {
    marginTop: "10px",
    fontSize: "14px",
  },
  medList: {
    paddingLeft: "20px",
    marginTop: "5px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  editBtn: {
    textDecoration: "none",
    background: "#ffc107",
    color: "black",
    padding: "8px 12px",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  deleteBtn: {
    background: "#cc0000",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  medBtn: {
    display: "block",
    marginTop: "10px",
    padding: "10px",
    textAlign: "center",
    background: "#28a745",
    color: "white",
    borderRadius: "5px",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
