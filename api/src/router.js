const { Router } = require("express");
const multer = require("multer");

const router = Router();

const filename = (request, file, callback) => {
  callback(null, file.originalname);
};

const app = require("../app");
const { response } = require("../app");
const { json } = require("body-parser");

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

router.post("/upload", upload.single("photo"), (request, response) => {
  if (request.fileValidationError) {
    response.status(400).json({
      error: request.fileValidationError,
    });
  } else {
    response.status(201).json({
      success: true,
    });
  }
});
module.exports = router;
