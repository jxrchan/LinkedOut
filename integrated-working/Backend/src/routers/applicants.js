const express = require("express");
const router = express.Router();
const { seedApplicants, applyJob } = require("../controllers/employers");
const { checkErrors } = require("../validators/checkErrors");
const { validateApplyJobData } = require("../validators/applicants");
const { uploadPdfFile, downloadPdfFile } = require("../controllers/fileUpload");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/seed", seedApplicants);
router.post("/apply", validateApplyJobData, checkErrors, applyJob);
router.post("/upload", upload.single("file"), uploadPdfFile);
router.get("/download/:id", downloadPdfFile);

module.exports = router;
