// server/controllers/patientController.js
import Patient from "../models/Patient.js";

// CREATE PATIENT (doctor must be logged in)
export const createPatient = async (req, res) => {
  try {
    const doctorMongoId = req.user?._id;

    if (!doctorMongoId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const {
      patientId,
      doctorId,
      caregiverId,
      name,
      age,
      diagnosis,
      symptoms,
      image,
      medications, // <-- NEW
    } = req.body;

    if (!patientId || !name || !age || !diagnosis) {
      return res
        .status(400)
        .json({ message: "patientId, name, age and diagnosis are required" });
    }

    const patient = await Patient.create({
      patientId,
      doctorId,
      caregiverId,
      name,
      age,
      diagnosis,
      symptoms,
      image,
      doctor: doctorMongoId,          // logged-in doctor
      medications: Array.isArray(medications) ? medications : [], // safe default
    });

    res.status(201).json({ message: "Patient created", patient });
  } catch (err) {
    console.error("Create patient error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PATIENTS (ADMIN)
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("doctor", "name email role")
      .populate("caregiver", "name email role");

    res.json(patients);
  } catch (err) {
    console.error("Get all patients error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET PATIENTS FOR LOGGED-IN DOCTOR
export const getDoctorPatients = async (req, res) => {
  try {
    const doctorMongoId = req.user?._id;

    const patients = await Patient.find({ doctor: doctorMongoId })
      .populate("doctor", "name email role")
      .populate("caregiver", "name email role");

    res.json(patients);
  } catch (err) {
    console.error("Get doctor patients error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE PATIENT BY ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("doctor", "name email role")
      .populate("caregiver", "name email role");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    console.error("Get patient by ID error:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PATIENT (doctor field not changed here)
export const updatePatient = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      caregiverId,
      name,
      age,
      diagnosis,
      symptoms,
      image,
      medications, // <-- NEW
    } = req.body;

    const updateData = {
      patientId,
      doctorId,
      caregiverId,
      name,
      age,
      diagnosis,
      symptoms,
      image,
    };

    // only override medications if provided
    if (Array.isArray(medications)) {
      updateData.medications = medications;
    }

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient updated", patient });
  } catch (err) {
    console.error("Update patient error:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE PATIENT
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient removed" });
  } catch (err) {
    console.error("Delete patient error:", err);
    res.status(500).json({ message: err.message });
  }
};
