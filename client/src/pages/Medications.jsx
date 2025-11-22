// client/src/pages/Medications.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Medications() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [medLibrary, setMedLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAll = async () => {
      try {
        // 1) Load patient
        const patientRes = await API.get(`/patients/${patientId}`);
        setPatient(patientRes.data);

        // 2) Load medication library
        const libraryRes = await API.get("/medications");
        setMedLibrary(libraryRes.data);
      } catch (err) {
        console.error("Failed to load data", err);
        setError("Could not load medications for this patient.");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [patientId]);

  // -----------------------------
  // UPDATE MEDICATION ENTRY
  // -----------------------------
  const updateMedication = (index, field, value) => {
    const updated = [...patient.medications];
    updated[index][field] = value;

    if (field === "medId") {
      const selected = medLibrary.find((m) => String(m.medId) === value);
      if (selected) {
        updated[index].name = selected.name;
        updated[index].dosage = selected.defaultDosage;
        updated[index].time = "Morning";
      }
    }

    setPatient({ ...patient, medications: updated });
  };

  // -----------------------------
  // ADD MEDICATION ENTRY
  // -----------------------------
  const addMedication = () => {
    setPatient({
      ...patient,
      medications: [
        ...patient.medications,
        { medId: "", name: "", dosage: "", time: "" },
      ],
    });
  };

  // -----------------------------
  // REMOVE MEDICATION ENTRY
  // -----------------------------
  const removeMedication = (index) => {
    setPatient({
      ...patient,
      medications: patient.medications.filter((_, i) => i !== index),
    });
  };

  // -----------------------------
  // SAVE ALL CHANGES
  // -----------------------------
  const saveChanges = async () => {
    try {
      await API.put(`/patients/${patientId}`, {
        medications: patient.medications,
        patientId: patient.patientId,
        doctorId: patient.doctorId,
        caregiverId: patient.caregiverId,
        name: patient.name,
        age: patient.age,
        diagnosis: patient.diagnosis,
        symptoms: patient.symptoms,
        image: patient.image,
      });

      alert("Medication changes saved!");
      navigate("/patients");
    } catch (err) {
      console.error("Failed to save", err);
      alert("Could not save medication changes.");
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={{ color: "white" }}>Loading medications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={styles.error}>{error}</p>
          <button style={styles.backBtn} onClick={() => navigate("/patients")}>
            ← Back to Patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>
              Medications for {patient?.name || "Patient"}
            </h1>
            <p style={styles.subtitle}>
              Patient ID: {patient?.patientId} • Age: {patient?.age} • Diagnosis:{" "}
              {patient?.diagnosis}
            </p>
          </div>

          <button style={styles.backBtn} onClick={() => navigate("/patients")}>
            ← Back to Patients
          </button>
        </div>

        <h2 style={{ color: "white" }}>Manage Medications</h2>

        {/* Medication List */}
        <div style={styles.medsGrid}>
          {patient.medications.map((m, index) => (
            <div key={index} style={styles.medCard}>
              {/* MEDICATION DROPDOWN */}
              <label style={styles.label}>Medication</label>
              <select
                value={m.medId}
                onChange={(e) =>
                  updateMedication(index, "medId", e.target.value)
                }
                style={styles.select}
              >
                <option value="">Select Medication</option>
                {medLibrary.map((med) => (
                  <option key={med.medId} value={med.medId}>
                    {med.name}
                  </option>
                ))}
              </select>

              {/* DOSAGE */}
              <label style={styles.label}>Dosage</label>
              <input
                type="text"
                value={m.dosage}
                onChange={(e) =>
                  updateMedication(index, "dosage", e.target.value)
                }
                style={styles.input}
              />

              {/* TIME */}
              <label style={styles.label}>Time</label>
              <select
                value={m.time}
                onChange={(e) =>
                  updateMedication(index, "time", e.target.value)
                }
                style={styles.select}
              >
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Night</option>
              </select>

              {/* REMOVE */}
              <button
                type="button"
                onClick={() => removeMedication(index)}
                style={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button onClick={addMedication} style={styles.addBtn}>
          + Add Medication
        </button>

        <button onClick={saveChanges} style={styles.saveBtn}>
          Save Medication Changes
        </button>
      </div>
    </div>
  );
}

//
// STYLES
//
const styles = {
  page: { padding: "30px 40px" },
  container: { maxWidth: "1100px", margin: "0 auto", color: "white" },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  title: { fontSize: "2rem", margin: 0 },
  subtitle: { margin: 0, color: "#cccccc" },

  backBtn: {
    padding: "8px 14px",
    background: "#444",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  medsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "15px",
  },

  medCard: {
    background: "white",
    color: "#222",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
  },

  label: { fontWeight: "bold", marginTop: "8px", display: "block" },
  input: {
    padding: "9px",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "6px",
  },
  select: {
    padding: "9px",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "6px",
  },

  addBtn: {
    marginTop: "20px",
    padding: "12px 18px",
    background: "#28a745",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  removeBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "#cc0000",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },

  saveBtn: {
    marginTop: "30px",
    padding: "14px",
    background: "#007bff",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    width: "100%",
  },

  error: {
    background: "#ffe5e5",
    color: "#c00",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
};
