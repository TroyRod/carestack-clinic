// client/src/pages/Medications.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Medications.css";

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
      <div className="medications-page">
        <p className="loading-message">Loading medications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="medications-page">
        <p className="error-message">{error}</p>
        <button onClick={() => navigate("/patients")} className="cancel-btn">
          ← Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="medications-page">
      <div className="med-header">
        <h1>Medications for {patient?.name || "Patient"}</h1>
        <p>
          Patient ID: {patient?.patientId} • Age: {patient?.age} • Diagnosis:{" "}
          {patient?.diagnosis}
        </p>
      </div>

      <div className="medications-container">
        {/* Medication List */}
        {patient.medications.map((m, index) => (
          <div key={index} className="med-entry">
            {/* MEDICATION DROPDOWN */}
            <div className="med-field">
              <label>Medication</label>
              <select
                value={m.medId}
                onChange={(e) =>
                  updateMedication(index, "medId", e.target.value)
                }
              >
                <option value="">Select Medication</option>
                {medLibrary.map((med) => (
                  <option key={med.medId} value={med.medId}>
                    {med.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DOSAGE */}
            <div className="med-field">
              <label>Dosage</label>
              <input
                type="text"
                value={m.dosage}
                onChange={(e) =>
                  updateMedication(index, "dosage", e.target.value)
                }
              />
            </div>

            {/* TIME */}
            <div className="med-field">
              <label>Time</label>
              <select
                value={m.time}
                onChange={(e) =>
                  updateMedication(index, "time", e.target.value)
                }
              >
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Night</option>
              </select>
            </div>

            {/* REMOVE */}
            <button
              type="button"
              onClick={() => removeMedication(index)}
              className="remove-btn"
            >
              ✕ Remove
            </button>
          </div>
        ))}

        <button onClick={addMedication} className="add-med-btn">
          + Add Medication
        </button>

        <div className="button-group">
          <button onClick={saveChanges} className="save-btn">
            Save Changes
          </button>
          <button onClick={() => navigate("/patients")} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
