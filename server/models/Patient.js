import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: 
    { 
        type: Number, 
        required: true, 
        min: 100, 
        max: 999, 
        unique: true 
    },
    doctorId: 
    {
         type: Number, 
         required: true, 
         min: 100, 
         max: 999 
    },
    caregiverId: 
    { 
        type: Number, 
        min: 100, 
        max: 999 
    },

    name:
    {
        type: String,
        required: true 
    },
    age:
    {
        type: Number, 
        required: true 
    },
    diagnosis:
    {
        type: String,
        required: true 
    },

    doctor:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    caregiver:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
