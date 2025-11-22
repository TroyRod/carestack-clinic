// server/models/Patient.js
import mongoose from "mongoose";

const medicationEntrySchema = new mongoose.Schema(
  {
    medId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true, // from library, e.g. "Metformin"
    },
    dosage: {
      type: String,
      required: true, // e.g. "500 mg"
    },
    time: {
      type: String,
      required: true, // e.g. "Morning", "Night"
    },
  },
  { _id: false }
);

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: Number, required: true },    // your custom ID
    doctorId: { type: Number },                     // custom doctor # (optional)
    caregiverId: { type: Number },                  // custom caregiver # (optional)

    name: { type: String, required: true },
    age: { type: Number, required: true },
    diagnosis: { type: String, required: true },
    symptoms: { type: String },

    image: { type: String, default: "" },

    // Mongo references
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caregiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Embedded medications list
    medications: [medicationEntrySchema],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
