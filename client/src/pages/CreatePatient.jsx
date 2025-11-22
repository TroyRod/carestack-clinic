import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreatePatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    caregiverId: "",
    name: "",
    age: "",
    diagnosis: "",
    symptoms: "",
    image: "",
    medications: [],
  });

  const [allMeds, setAllMeds] = useState([]);

  useEffect(() => {
    const loadMeds = async () => {
      try {
        const res = await API.get("/medications");
        setAllMeds(res.data);
      } catch (err) {
        console.error("Failed to load medications", err);
      }
    };
    loadMeds();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMedication = () => {
    setForm({
      ...form,
      medications: [...form.medications, { medId: "", name: "", dosage: "", time: "" }],
    });
  };

  const updateMedication = (index, field, value) => {
    const meds = [...form.medications];

    if (field === "medId") {
      const selected = allMeds.find((m) => m.medId === Number(value));
      meds[index].medId = selected.medId;
      meds[index].name = selected.name;
    } else {
      meds[index][field] = value;
    }

    setForm({ ...form, medications: meds });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await API.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ ...form, image: res.data.imagePath });
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/patients", form);
      alert("Patient created successfully");
      navigate("/patients");
    } catch (err) {
      console.error("Create failed", err);
      alert("Error creating patient");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Create Patient</h1>

      <form onSubmit={handleSubmit} style={styles.form}>

        {/* LEFT COLUMN */}
        <div style={styles.column}>
          <label style={styles.label}>Patient ID</label>
          <input name="patientId" value={form.patientId} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Doctor Custom ID</label>
          <input name="doctorId" value={form.doctorId} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Caregiver Custom ID</label>
          <input name="caregiverId" value={form.caregiverId} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Age</label>
          <input name="age" value={form.age} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Diagnosis</label>
          <input name="diagnosis" value={form.diagnosis} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Symptoms</label>
          <textarea name="symptoms" value={form.symptoms} onChange={handleChange} style={styles.textarea} />
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.column}>
          <label style={styles.label}>Patient Image</label>

          <button
            type="button"
            onClick={() => document.getElementById("uploadImgInput").click()}
            style={styles.uploadBtn}
          >
            Upload Image
          </button>

          <input
            id="uploadImgInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          {form.image && (
            <img src={`http://localhost:3000${form.image}`} style={styles.preview} alt="Patient" />
          )}

          <h3 style={{ marginTop: 20 }}>Medications</h3>

          {form.medications.map((m, index) => (
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

          <button type="button" style={styles.addBtn} onClick={addMedication}>+ Add Medication</button>
        </div>
      </form>

      <button onClick={handleSubmit} style={styles.submitBtn}>Create Patient</button>
    </div>
  );
}

//
// STYLES
//
const styles = {
  page: { padding: "20px 40px" },
  title: { fontSize: "32px", color: "white", marginBottom: 20 },

  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    background: "white",
    padding: 30,
    borderRadius: 10,
  },

  column: { display: "flex", flexDirection: "column", gap: 12 },

  label: { color: "#333", fontWeight: "bold", fontSize: "14px" },

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
    padding: "10px 15px",
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
    marginTop: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  medCard: {
    background: "#f7f7f7",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  addBtn: {
    marginTop: 10,
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 6,
    cursor: "pointer",
    width: "fit-content",
  },

  submitBtn: {
    marginTop: 20,
    background: "#0066ff",
    color: "white",
    padding: "12px 18px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
  },
};
