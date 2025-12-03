import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    // 3-digit medication ID
    medId: {
      type: Number,
      required: true,
      min: 100,
      max: 999,
      unique: true
    },

    // Medication info
    name: {
      type: String,
      required: true
    },

    dosage: {
      type: String,
      required: true
    },

    frequency: {
      type: String,
      required: true
    },

    // 3-digit patient ID (for frontend lookup)
    patientId: {
      type: Number,
      required: true,
      min: 100,
      max: 999
    },

    // 3-digit prescriber ID (doctor customId)
    prescriberId: {
      type: Number,
      required: true,
      min: 100,
      max: 999
    },

    // MongoDB reference to patient document
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    // MongoDB reference to the doctor user
    prescribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;
