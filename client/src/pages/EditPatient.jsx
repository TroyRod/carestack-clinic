import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import anonymousPhoto from "../assets/anonymous.webp";
import "./EditPatient.css";

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
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="edit-page">
      <h1 className="edit-title">Edit Patient</h1>

      <form onSubmit={saveChanges} className="edit-form">
        {/* LEFT COLUMN */}
        <div className="form-column">
          <label>Patient ID</label>
          <input
            name="patientId"
            value={patient.patientId}
            onChange={handleChange}
          />

          <label>Full Name</label>
          <input
            name="name"
            value={patient.name}
            onChange={handleChange}
          />

          <label>Age</label>
          <input
            name="age"
            value={patient.age}
            onChange={handleChange}
          />

          <label>Diagnosis</label>
          <input
            name="diagnosis"
            value={patient.diagnosis}
            onChange={handleChange}
          />

          <label>Symptoms</label>
          <textarea
            name="symptoms"
            value={patient.symptoms}
            onChange={handleChange}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="form-column">
          <label>Patient Image</label>

          <button
            type="button"
            onClick={() => document.getElementById("editImgUpload").click()}
            className="upload-btn"
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
              className="image-preview"
              alt="Patient"
            />
          )}

          <h3 className="med-section-title">Medications</h3>

          {patient.medications.map((m, index) => (
            <div key={index} className="med-card">
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

          <button
            type="button"
            onClick={addMedication}
            className="add-med-btn"
          >
            + Add Medication
          </button>
        </div>
      </form>

      <div className="button-group">
        <button onClick={saveChanges} className="save-btn">
          Save Changes
        </button>
        <button onClick={() => navigate("/patients")} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
