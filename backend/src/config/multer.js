import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main upload directory
const uploadDir = path.join(__dirname, "uploads");

// Create base and sub-directories if missing
const folders = ["images", "videos", "pdfs"];
folders.forEach((folder) => {
  const fullPath = path.join(uploadDir, folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// File filter for images, videos, and PDFs
const fileFilter = (req, file, cb) => {
  const mime = file.mimetype;

  if (
    mime.startsWith("image/") ||
    mime.startsWith("video/") ||
    mime === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images, videos, and PDFs are allowed."), false);
  }
};

// Dynamic folder selection
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "others";

    if (file.mimetype.startsWith("image/")) folder = "images";
    else if (file.mimetype.startsWith("video/")) folder = "videos";
    else if (file.mimetype === "application/pdf") folder = "pdfs";

    const finalPath = path.join(uploadDir, folder);
    cb(null, finalPath);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const uniqueName = `${base}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

export default upload;
