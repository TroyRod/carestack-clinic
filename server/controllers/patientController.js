import Patient from "../models/Patient.js";

// CREATE PATIENT (admin + doctor)
export const createPatient = async (req, res) => {
  try {
    const { 
      patientId, 
      doctorId, 
      caregiverId,   // <— added caregiverId support
      name, 
      age, 
      diagnosis, 
      doctor, 
      caregiver 
    } = req.body;

    // Validate patient ID = 3 digits
    if (!patientId || patientId < 100 || patientId > 999) {
      return res.status(400).json({
        message: "Patient ID must be a 3-digit number (100–999)"
      });
    }

    // Validate doctor ID = 3 digits
    if (!doctorId || doctorId < 100 || doctorId > 999) {
      return res.status(400).json({
        message: "Doctor ID must be a 3-digit number (100–999)"
      });
    }

    // Validate caregiver ID (optional)
    if (caregiverId && (caregiverId < 100 || caregiverId > 999)) {
      return res.status(400).json({
        message: "Caregiver ID must be a 3-digit number (100–999)"
      });
    }

    // Validate required fields
    if (!name || !age || !diagnosis || !doctor) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the patient
    const patient = await Patient.create({
      patientId,
      doctorId,
      caregiverId: caregiverId || null,
      name,
      age,
      diagnosis,
      doctor,
      caregiver: caregiver || null
    });

    res.status(201).json({ message: "Patient created", patient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PATIENTS (admin)
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("doctor caregiver", "name email role customId");

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PATIENTS FOR THE LOGGED-IN DOCTOR
export const getDoctorPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ doctor: req.user._id })
      .populate("doctor caregiver", "name email customId role");

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PATIENT
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient updated", patient });
  } catch (err) {
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
    res.status(500).json({ message: err.message });
  }
};
