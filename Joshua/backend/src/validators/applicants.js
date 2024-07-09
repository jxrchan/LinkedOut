const { body, param } = require("express-validator");

const validateApplyJobData = [
  body("applicantId", "Applicant Id is required").notEmpty().isMongoId(),
  body("jobId", "Job  Id is required").notEmpty().isMongoId(),
  body("resumeDocument", "resume documents is required").notEmpty(),
];

const validateGetResumeData = [
  param("jobId", "job Id is required").notEmpty().isMongoId(),
  param("applicantId", "applicant Id is required").notEmpty().isMongoId(),
];
module.exports = { validateApplyJobData, validateGetResumeData };
