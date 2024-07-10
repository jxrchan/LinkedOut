const express = require("express");
const router = express.Router();

const {
  seedJobs,
  getJobById,
  getAllActiveJobs,
  submitResume,
  getApplicant,
  applyJob,
} = require("../controllers/jobList");

const {
  validateIdInBody,
  validateIdInParam,
  validateAddBookData,
  validateUpdateBookData,
} = require("../validators/books");
const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");

router.get("/jobs/seed", seedJobs);
router.post("/applicant", getApplicant);

router.get("/jobs", getAllActiveJobs);
router.post("/jobs", getJobById);
router.post("/jobs/apply", applyJob);
router.post("/jobs/resume/:id", submitResume);

module.exports = router;
