const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const router = Router();
const photoPath = path.resolve(__dirname, "../../client/photo-viewer.html");
const imageProcessor = require("./imageProcessor");

const filename = (request, file, callback) => {
  callback(null, file.originalname);
};

const storage = multer.diskStorage({
  destination: "api/uploads/",
  filename: filename,
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype !== "image/png") {
    req.fileValidationError = "Wrong file type";
    callback(null, false, new Error("Wrong file type"));
  } else {
    callback(null, true);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});

router.post("/upload", upload.single("photo"), async (request, response) => {
  if (request.fileValidationError) {
    response.status(400).json({
      error: request.fileValidationError,
    });
  } else {
    response.status(201).json({
      success: true,
    });
  }
  try {
    await imageProcessor(request.file.filename);
  } catch {}
});

router.get("/photo-viewer", (req, res) => {
  res.sendFile(photoPath);
});

module.exports = router;
