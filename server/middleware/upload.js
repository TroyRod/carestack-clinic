// server/middleware/upload.js
import multer from "multer";
import path from "path";

// Storage configuration: where and how files will be saved
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Only allow JPG/PNG images
const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());

  if (ext) cb(null, true);
  else cb("Only .jpg, .jpeg, .png images are allowed!", false);
};

// Export Multer middleware
const upload = multer({
  storage,
  fileFilter,
});

export default upload;
