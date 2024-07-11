const express = require("express");
const router = express.Router();
const {
  getEmployerAllActiveJobs,
  deleteJob,
  updateJob,
  createJob,
  getEmployerAllTerminatedJobs,
  getApplicants,
  getOneApplicantResume,
  terminateJob,
  postEmployerDetails,
  getEmployerDetails,
  updateEmployerDetails,
  seedEmployers,
  getOneEmployer,
} = require("../controllers/employers");
const { checkErrors } = require("../validators/checkErrors");
const {
  validateIdInParam,
  validateCreateJobData,
  validateUpdateJobData,
  validatePostEmployerData,
  validateGetEmployer,
} = require("../validators/employers");
const { validateGetResumeData } = require("../validators/applicants");
const { auth } = require("../middleware/auth");

router.post("/seed", seedEmployers);

//Profile Functions
router.post(
  "/profile",
  auth,
  validatePostEmployerData,
  checkErrors,
  postEmployerDetails
);
router.get(
  "/profile/:id",
  auth,
  validateIdInParam,
  checkErrors,
  getEmployerDetails
);
router.patch(
  "/profile/:id",
  auth,
  validateIdInParam,
  checkErrors,
  updateEmployerDetails
);

router.post("", auth, validateGetEmployer, checkErrors, getOneEmployer);

//Job Dashboard Functions

router.get(
  "/jobs/:id",
  auth,
  validateIdInParam,
  checkErrors,
  getEmployerAllActiveJobs
);
router.get(
  "/terminated-jobs/:id",
  auth,
  validateIdInParam,
  getEmployerAllTerminatedJobs
);
// router.get("/jobs/:id", validateIdInParam, checkErrors, getEmployerOneJob);
router.put("/jobs", auth, validateCreateJobData, checkErrors, createJob);

router.delete("/jobs/:id", auth, validateIdInParam, checkErrors, deleteJob);
router.patch("/jobs", auth, validateUpdateJobData, checkErrors, updateJob);
router.patch(
  "/terminate-job/:id",
  validateIdInParam,
  checkErrors,
  terminateJob
);

//Applicant Functions
router.get("/job/:id", auth, validateIdInParam, checkErrors, getApplicants);
router.get(
  "/job/:applicantId/:jobId",
  auth,
  validateGetResumeData,
  checkErrors,
  getOneApplicantResume
);

module.exports = router;
