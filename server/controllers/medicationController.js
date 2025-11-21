import Medication from "../models/Medication.js";

// CREATE MEDICATION (admin + doctor)
export const createMedication = async (req, res) => {
  try {
    const {
      medId,
      name,
      dosage,
      frequency,
      patientId,
      prescriberId,
      patient,        // MongoDB Patient _id
      prescribedBy    // MongoDB User _id
    } = req.body;

    // Validate medId
    if (!medId || medId < 100 || medId > 999) {
      return res.status(400).json({
        message: "Medication ID must be a 3-digit number (100–999)"
      });
    }

    // Validate patientId
    if (!patientId || patientId < 100 || patientId > 999) {
      return res.status(400).json({
        message: "Patient ID must be a 3-digit number (100–999)"
      });
    }

    // Validate prescriberId (doctor custom ID)
    if (!prescriberId || prescriberId < 100 || prescriberId > 999) {
      return res.status(400).json({
        message: "Prescriber ID must be a 3-digit number (100–999)"
      });
    }

    // Required fields
    if (!name || !dosage || !frequency || !patient || !prescribedBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const medication = await Medication.create({
      medId,
      name,
      dosage,
      frequency,
      patientId,
      prescriberId,
      patient,
      prescribedBy
    });

    res.status(201).json({ message: "Medication created", medication });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL MEDICATIONS FOR A PATIENT
export const getMedicationsByPatient = async (req, res) => {
  try {
    const patientMongoId = req.params.patientId;

    const meds = await Medication.find({ patient: patientMongoId })
      .populate("prescribedBy", "name email customId role");

    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET A SINGLE MEDICATION
export const getMedicationById = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id)
      .populate("patient", "name patientId")
      .populate("prescribedBy", "name customId email");

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json(med);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE MEDICATION
export const updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ message: "Medication updated", medication });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE MEDICATION
export const deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findByIdAndDelete(req.params.id);

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ message: "Medication removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET ALL MEDICATIONS (admin)
export const getAllMedications = async (req, res) => {
  try {
    const meds = await Medication.find()
      .populate("patient", "name patientId")
      .populate("prescribedBy", "name customId email");
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};