import { useEffect, useState } from "react";
import API from "../api/api";

export default function Admin() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users/doctors");
      setDoctors(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      setError(err.response?.data?.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToAdmin = async (userId) => {
    if (!window.confirm("Are you sure you want to convert this user to admin?")) return;

    try {
      await API.put(`/users/${userId}/convert-to-admin`);
      alert("User converted to admin successfully!");
      // Remove from doctors list (or refresh)
      setDoctors(doctors.filter(d => d._id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to convert user");
    }
  };

  const handleDeleteDoctor = async (doctorId, doctorName) => {
    if (!window.confirm(`Are you sure you want to delete Dr. ${doctorName}? This will also delete all their patients.`)) return;

    try {
      await API.delete(`/users/${doctorId}`);
      alert("Doctor deleted successfully!");
      fetchDoctors(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete doctor");
    }
  };

  const toggleDoctorPatients = (doctorId) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p>Loading doctors...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <p style={styles.subtitle}>Manage Doctors and Their Patients</p>

      {error && <p style={styles.error}>{error}</p>}

      {doctors.length === 0 ? (
        <p style={styles.noDoctors}>No doctors found in the system.</p>
      ) : (
        <div style={styles.doctorsList}>
          {doctors.map((doctor) => (
            <div key={doctor._id} style={styles.doctorCard}>
              <div style={styles.doctorHeader}>
                <div>
                  <h2 style={styles.doctorName}>Dr. {doctor.name}</h2>
                  <p style={styles.doctorInfo}>
                    <strong>Email:</strong> {doctor.email}
                  </p>
                  <p style={styles.doctorInfo}>
                    <strong>Custom ID:</strong> {doctor.customId || "N/A"}
                  </p>
                  <p style={styles.patientCount}>
                    <strong>Patients:</strong> {doctor.patientCount || 0}
                  </p>
                </div>
                <div style={styles.doctorActions}>
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id, doctor.name)}
                    style={styles.deleteBtn}
                  >
                    Delete Doctor
                  </button>
                </div>
              </div>

              {doctor.patientCount > 0 && (
                <button
                  onClick={() => toggleDoctorPatients(doctor._id)}
                  style={styles.toggleBtn}
                >
                  {expandedDoctor === doctor._id
                    ? "Hide Patients"
                    : `Show ${doctor.patientCount} Patient(s)`}
                </button>
              )}

              {expandedDoctor === doctor._id && doctor.patients && (
                <div style={styles.patientsList}>
                  {doctor.patients.length === 0 ? (
                    <p>No patients assigned to this doctor.</p>
                  ) : (
                    doctor.patients.map((patient) => (
                      <div key={patient._id} style={styles.patientCard}>
                        <h3 style={styles.patientName}>{patient.name}</h3>
                        <p>
                          <strong>Age:</strong> {patient.age}
                        </p>
                        <p>
                          <strong>Diagnosis:</strong> {patient.diagnosis}
                        </p>
                        {patient.medications && patient.medications.length > 0 && (
                          <div style={styles.medications}>
                            <strong>Medications:</strong>
                            <ul>
                              {patient.medications.map((med, idx) => (
                                <li key={idx}>
                                  {med.name} - {med.dosage} ({med.time})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={styles.actions}>
        <h2 style={styles.sectionTitle}>User Management</h2>
        <p>
          <a href="/users" style={styles.linkBtn}>
            View All Users (including caregivers)
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "var(--deep-blue)",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: "30px",
  },
  error: {
    color: "red",
    padding: "10px",
    backgroundColor: "#ffe6e6",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  noDoctors: {
    fontSize: "1.1rem",
    color: "#666",
    textAlign: "center",
    padding: "40px",
  },
  doctorsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  doctorCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
  },
  doctorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  doctorName: {
    margin: "0 0 10px 0",
    fontSize: "1.5rem",
    color: "var(--deep-blue)",
  },
  doctorInfo: {
    margin: "5px 0",
    fontSize: "14px",
    color: "#555",
  },
  patientCount: {
    margin: "10px 0",
    fontSize: "16px",
    color: "var(--sky-blue)",
    fontWeight: "bold",
  },
  doctorActions: {
    display: "flex",
    gap: "10px",
  },
  deleteBtn: {
    backgroundColor: "#cc0000",
    color: "white",
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  toggleBtn: {
    backgroundColor: "var(--sky-blue)",
    color: "white",
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "10px",
  },
  patientsList: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "2px solid #eee",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },
  patientCard: {
    backgroundColor: "#f5f5f5",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  patientName: {
    margin: "0 0 10px 0",
    fontSize: "1.1rem",
    color: "var(--deep-blue)",
  },
  medications: {
    marginTop: "10px",
    fontSize: "14px",
  },
  actions: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "var(--deep-blue)",
  },
  linkBtn: {
    display: "inline-block",
    backgroundColor: "var(--sky-blue)",
    color: "white",
    padding: "12px 24px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

