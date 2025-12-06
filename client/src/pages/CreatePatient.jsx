import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./CreatePatient.css";

export default function CreatePatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientId: "",
    name: "",
    age: "",
    diagnosis: "",
    symptoms: "",
    image: "",
    medications: [],
    doctorId: "",
  });

  const [allMeds, setAllMeds] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // LOAD MEDICATIONS AND CHECK IF ADMIN
  useEffect(() => {
    const loadMeds = async () => {
      try {
        const res = await API.get("/medications");
        setAllMeds(res.data);
      } catch (err) {
        console.error("Failed to load medications", err);
      }
    };

    const checkAdminAndLoadDoctors = async () => {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        setIsAdmin(true);
        try {
          const res = await API.get("/users/doctors");
          setDoctors(res.data);
        } catch (err) {
          console.error("Failed to load doctors", err);
        }
      }
    };

    loadMeds();
    checkAdminAndLoadDoctors();
  }, []);

  // UPDATE TEXT INPUTS
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD MEDICATION ROW
  const addMedication = () => {
    setForm({
      ...form,
      medications: [
        ...form.medications,
        { medId: "", name: "", dosage: "", time: "" },
      ],
    });
  };

  // REMOVE MEDICATION ROW
  const removeMedication = (index) => {
    const meds = [...form.medications];
    meds.splice(index, 1);
    setForm({ ...form, medications: meds });
  };

  // UPDATE MEDICATION FIELDS
  const updateMedication = (index, field, value) => {
    const meds = [...form.medications];

    if (field === "medId") {
      const selected = allMeds.find((m) => m.medId === Number(value));
      meds[index].medId = selected?.medId || "";
      meds[index].name = selected?.name || "";
    } else {
      meds[index][field] = value;
    }

    setForm({ ...form, medications: meds });
  };

  // IMAGE UPLOAD
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

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent empty medication objects
    const cleanedMeds = form.medications.filter(
      (m) => m.medId && m.dosage && m.time
    );

    // Prepare data to send
    const dataToSend = { ...form, medications: cleanedMeds };

    try {
      await API.post("/patients", dataToSend);
      alert("Patient created successfully");
      navigate("/patients");
    } catch (err) {
      console.error("Create failed", err);
      alert("Error creating patient");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Create Patient</h1>

      <form onSubmit={handleSubmit} className="patient-form">
        {/* LEFT COLUMN */}
        <div className="form-column">
          <label>Patient ID</label>
          <input name="patientId" value={form.patientId} onChange={handleChange} />

          {isAdmin && (
            <>
              <label>Assign to Doctor</label>
              <select
                name="doctorId"
                value={form.doctorId}
                onChange={handleChange}
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} (ID: {doc.customId})
                  </option>
                ))}
              </select>
            </>
          )}

          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Age</label>
          <input name="age" value={form.age} onChange={handleChange} />

          <label>Diagnosis</label>
          <input name="diagnosis" value={form.diagnosis} onChange={handleChange} />

          <label>Symptoms</label>
          <textarea
            name="symptoms"
            value={form.symptoms}
            onChange={handleChange}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="form-column">
          <label>Patient Image</label>

          <button
            type="button"
            className="upload-button"
            onClick={() => document.getElementById("uploadImgInput").click()}
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
            <img
              src={`http://localhost:3000${form.image}`}
              alt="Preview"
              className="image-preview"
            />
          )}

          <h3 className="med-title">Medications</h3>

          {form.medications.map((m, index) => (
            <div key={index} className="med-card">
              <button
                type="button"
                className="remove-med-btn"
                onClick={() => removeMedication(index)}
              >
                ✕
              </button>

              <label>Select Medication</label>
              <select
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

              <label>Dosage</label>
              <input
                value={m.dosage}
                onChange={(e) => updateMedication(index, "dosage", e.target.value)}
              />

              <label>Time</label>
              <input
                value={m.time}
                onChange={(e) => updateMedication(index, "time", e.target.value)}
              />
            </div>
          ))}

          <button type="button" className="add-med-btn" onClick={addMedication}>
            + Add Medication
          </button>
        </div>
      </form>

      <button className="submit-btn" onClick={handleSubmit}>
        Create Patient
      </button>
    </div>
  );
}
