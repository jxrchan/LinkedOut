const express = require("express");
const router = express.Router();
const {
  getEmployerAllActiveJobs,
  // getEmployerOneJob,
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
  validateIdInBody,
  validatePostEmployerData,
  validateEmailInParam,
} = require("../validators/employers");
const { validateGetResumeData } = require("../validators/applicants");

router.post("/seed", seedEmployers);

//Profile Functions
router.post(
  "/profile",
  validatePostEmployerData,
  checkErrors,
  postEmployerDetails
);
router.get("/profile/:id", validateIdInParam, checkErrors, getEmployerDetails);
router.patch(
  "/profile/:id",
  validateIdInParam,
  checkErrors,
  updateEmployerDetails
);

router.get("/:email", validateEmailInParam, checkErrors, getOneEmployer);

//Job Dashboard Functions

router.get(
  "/jobs/:id",
  validateIdInParam,
  checkErrors,
  getEmployerAllActiveJobs
);
router.get(
  "/terminated-jobs/:id",
  validateIdInParam,
  getEmployerAllTerminatedJobs
);
// router.get("/jobs/:id", validateIdInParam, checkErrors, getEmployerOneJob);
router.put("/jobs", validateCreateJobData, checkErrors, createJob);

router.delete("/jobs/:id", validateIdInParam, checkErrors, deleteJob);
router.patch("/jobs", validateUpdateJobData, checkErrors, updateJob);
router.patch(
  "/terminate-job/:id",
  validateIdInParam,
  checkErrors,
  terminateJob
);

//Applicant Functions
router.get("/job/:id", validateIdInParam, checkErrors, getApplicants);
router.get(
  "/job/:applicantId/:jobId",
  validateGetResumeData,
  checkErrors,
  getOneApplicantResume
);

module.exports = router;
