const express = require("express");
const router = express.Router();
const { seedApplicants } = require("../controllers/employers");
const {checkErrors} = require("../validators/checkErrors");
const { validateApplyJobData } = require("../validators/applicants");

router.post("/seed", seedApplicants);
// router.post("/apply", validateApplyJobData, checkErrors, applyJob);

module.exports = router;
