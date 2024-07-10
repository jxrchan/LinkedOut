const express = require("express");
const router = express.Router();
const { uploadPdfFile } = require("../controllers/fileUpload");
const { checkErrors } = require("../validators/checkErrors");
const { validateApplyJobData } = require("../validators/applicants");

router.post("/pdf", uploadPdfFile);

module.exports = router;
