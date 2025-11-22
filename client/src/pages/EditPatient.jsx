import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [allMeds, setAllMeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load patient
        const res = await API.get(`/patients/${id}`);
        setPatient(res.data);

        // Load meds library
        const medsRes = await API.get("/medications");
        setAllMeds(medsRes.data);
      } catch (err) {
        console.error("Failed to load patient", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const updateMedication = (index, field, value) => {
    const meds = [...patient.medications];

    if (field === "medId") {
      const selected = allMeds.find((m) => m.medId === Number(value));
      if (selected) {
        meds[index].medId = selected.medId;
        meds[index].name = selected.name;
      }
    } else {
      meds[index][field] = value;
    }

    setPatient({ ...patient, medications: meds });
  };

  const addMedication = () => {
    setPatient({
      ...patient,
      medications: [...patient.medications, { medId: "", name: "", dosage: "", time: "" }],
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await API.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPatient({ ...patient, image: res.data.imagePath });
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    }
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/patients/${id}`, patient);
      alert("Patient updated successfully");
      navigate("/patients");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update patient");
    }
  };

  if (loading || !patient) {
    return <p style={{ padding: 20, color: "white" }}>Loading...</p>;
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Edit Patient</h1>

      <form onSubmit={saveChanges} style={styles.formContainer}>
        {/* LEFT COLUMN */}
        <div style={styles.leftColumn}>
          <label style={styles.label}>Patient ID</label>
          <input
            name="patientId"
            value={patient.patientId}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Doctor Custom ID</label>
          <input
            name="doctorId"
            value={patient.doctorId}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Caregiver Custom ID</label>
          <input
            name="caregiverId"
            value={patient.caregiverId || ""}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Full Name</label>
          <input
            name="name"
            value={patient.name}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Age</label>
          <input
            name="age"
            value={patient.age}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Diagnosis</label>
          <input
            name="diagnosis"
            value={patient.diagnosis}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Symptoms</label>
          <textarea
            name="symptoms"
            value={patient.symptoms}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.rightColumn}>
          <label style={styles.label}>Patient Image</label>

          <button
            type="button"
            onClick={() => document.getElementById("editImgUpload").click()}
            style={styles.uploadBtn}
          >
            Upload Image
          </button>

          <input
            id="editImgUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          {patient.image && (
            <img
              src={`http://localhost:3000${patient.image}`}
              style={styles.preview}
              alt="Patient"
            />
          )}

          <h3 style={{ marginTop: 20 }}>Medications</h3>

          {patient.medications.map((m, index) => (
            <div key={index} style={styles.medCard}>
              <label style={styles.label}>Select Medication</label>
              <select
                style={styles.input}
                value={m.medId}
                onChange={(e) => updateMedication(index, "medId", e.target.value)}
              >
                <option value="">Choose...</option>
                {allMeds.map((med) => (
                  <option key={med.medId} value={med.medId}>
                    {med.name}
                  </option>
                ))}
              </select>

              <label style={styles.label}>Dosage</label>
              <input
                style={styles.input}
                value={m.dosage}
                onChange={(e) => updateMedication(index, "dosage", e.target.value)}
              />

              <label style={styles.label}>Time</label>
              <input
                style={styles.input}
                value={m.time}
                onChange={(e) => updateMedication(index, "time", e.target.value)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addMedication}
            style={styles.addMedBtn}
          >
            + Add Medication
          </button>
        </div>
      </form>

      <button onClick={saveChanges} style={styles.saveBtn}>
        Save Changes
      </button>
    </div>
  );
}

//
// STYLES
//
const styles = {
  page: { padding: "20px 40px" },
  title: { fontSize: "32px", color: "white", marginBottom: 20 },

  formContainer: {
    background: "white",
    padding: 30,
    borderRadius: 10,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
  },

  leftColumn: { display: "flex", flexDirection: "column", gap: 12 },
  rightColumn: { display: "flex", flexDirection: "column", gap: 12 },

  label: { fontWeight: "bold", color: "#333" },

  input: {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#f4f4f4",
  color: "black",   // 👈 text typed inside input will be this color
},


  textarea: {
  height: 80,
  padding: 10,
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#f4f4f4",
  color: "black",   // 👈 same here
},


  uploadBtn: {
    padding: "10px 14px",
    background: "#007bff",
    color: "white",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    width: "150px",
  },

  preview: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: 8,
    marginTop: 10,
    border: "1px solid #ccc",
  },

  medCard: {
    background: "#f7f7f7",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  addMedBtn: {
    marginTop: 10,
    background: "green",
    color: "white",
    padding: "10px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    width: "fit-content",
  },

  saveBtn: {
    marginTop: 25,
    background: "#0066ff",
    color: "white",
    padding: "12px 18px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};
