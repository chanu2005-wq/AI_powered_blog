import multer from "multer";

// Use memoryStorage so imagekit.files.upload() can read file.buffer
const upload = multer({ storage: multer.memoryStorage() });

export default upload;
