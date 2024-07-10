const express = require("express");
const router = express.Router();
const { seedApplicants } = require("../controllers/employers");
const { checkErrors } = require("../validators/checkErrors");
const { validateApplyJobData } = require("../validators/applicants");

router.post("/seed", seedApplicants);

module.exports = router;
