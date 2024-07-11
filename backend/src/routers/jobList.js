const express = require("express");
const router = express.Router();

const {
  seedJobs,
  getJobById,
  getAllActiveJobs,
  submitResume,
  getApplicant,
  applyJob,
  checkAppliedJob,
} = require("../controllers/jobList");

const {
  validateIdInBody,
  validateIdInParam,
  validateAddBookData,
  validateUpdateBookData,
} = require("../validators/books");
const checkErrors = require("../validators/checkErrors");
const { auth } = require("../middleware/auth");

router.get("/jobs/seed", auth, seedJobs);
router.post("/applicant", auth, getApplicant);

router.get("/jobs", auth, getAllActiveJobs);
router.post("/jobs", auth, getJobById);
router.post("/applied-jobs", auth, checkAppliedJob);
router.post("/jobs/apply", auth, applyJob);
router.post("/jobs/resume/:id", auth, submitResume);

module.exports = router;
