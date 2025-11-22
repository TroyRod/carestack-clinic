// server/controllers/medicationController.js
import Medication from "../models/Medication.js";
import Patient from "../models/Patient.js";

// CREATE MEDICATION
export const createMedication = async (req, res) => {
  try {
    const med = await Medication.create(req.body);
    res.status(201).json(med);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL MEDICATIONS
export const getAllMedications = async (req, res) => {
  try {
    const meds = await Medication.find()
      .populate("patient", "name patientId")
      .populate("prescribedBy", "name email role customId");

    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MEDICATIONS FOR A SPECIFIC PATIENT (MATCHES ROUTE)
export const getMedicationsByPatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Return embedded medications
    res.json(patient.medications || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE MEDICATION
export const getMedicationById = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id)
      .populate("patient", "name patientId")
      .populate("prescribedBy", "name email role");

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json(med);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json(med);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndDelete(req.params.id);

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ message: "Medication removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
