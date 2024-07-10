// const JobList = require("../models/JobList");
const mongoose = require('mongoose');
const JobListModel = require("../models/Jobs");
const Applicants = require("../models/Applicants");
const Jobs = require("../models/Jobs");
const Employers = require("../models/Employers");
const Resumes = require("../models/Resumes");

const seedJobs = async (req, res) => {
  try {
    await JobListModel.deleteMany({});

    await JobListModel.create([
      {
        _id: "64d0f3f75676c304033d8c89",
        company: "company A",
        title: "Looking for Java developer",
        jobDes: "Develop Java",
      },
      {
        _id: "64d0f3f75676c304033d8c8a",
        company: "company B",
        title: "Looking for C developer",
        jobDes: "Develop C",
      },
      {
        _id: "64d0f3f75676c304033d8c8b",
        company: "company C",
        title: "Looking for Python developer",
        jobDes: "Develop Python",
      },
      {
        _id: "64d0f3f75676c304033d8c8e",
        company: "company D",
        title: "Looking for SQL developer",
        jobDes: "Develop SQL",
      },
      {
        _id: "64d0f3f75676c304033d8c8c",
        company: "company E",
        title: "Looking for Mongo developer",
        jobDes: "Develop Mongo",
      },
      {
        _id: "64d0f3f75676c304033d8c8d",
        company: "company F",
        title: "Looking for full-stack developer",
        jobDes: "Develop full-stack",
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

const getAllActiveJobs = async (req, res) => {
  try {
    const allJobs = await JobListModel.find({ status: "active" });
    res.json(allJobs);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    // const book = await BooksModel.findById(req.body.id);
    const jobItem = await JobListModel.findOne({ _id: req.body.id });
    // const book = await BooksModel.find({});
    res.json(jobItem);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting job" });
  }
};

//9/7 - Added New Function for dashboard banner
const getApplicant = async (req, res) => {
  try {
    const applicant = await Applicants.findOne({ email: req.body.email });
    res.json(applicant);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting applicant" });
  }
};



//9/7 Added New Function to apply for joB
const applyJob = async (req, res) => {
  try {
    const applicant = await Applicants.findById(req.body.applicantId);
    console.log(applicant);
    applicant.jobs_applied.push(req.body.jobId);
    await applicant.save();

    const job = await Jobs.findById(req.body.jobId);
    console.log(job);
    job.applicants.push(req.body.applicantId);
    await job.save();

    // await Resumes.create({
    //   applicant: req.body.applicantId,
    //   job: req.body.jobId,
    //   document: req.body.resumeDocument,
    // });
    res.status(200).json({ status: "ok", msg: "applied job" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error applying for job" });
  }
};

const submitResume = async function (req, res) {
  try {
    const { applicantId, document } = req.body;
    const jobId = req.params.id;
    await Resumes.create({
      applicant: applicantId,
      job: jobId,
      document: document,
    });
    console.log("Resume received");
    res.status(200).send({
      message: "Resume Received",
    });
  } catch (error) {
    res.send("Resume Submit Error");
  }
};

//10/7 Added new function to check if job has been applied for 

const checkAppliedJob = async (req, res) => {
  try {
  const job = await Jobs.findById(req.body.jobId);
  if (job.applicants.includes(req.body.applicantId)) {
  // const isJobApplied = await Jobs.find({_id: req.body.jobId, applicants: {$in: [req.body.applicantId]}});
  // if (isJobApplied.length === 0) 
    res.status(200).json("applied");}
  else res.status(200).json("unapplied");
  }
  catch (error) {
    console.error(error.message);
    res.status(400).json({status: 'error', msg: 'error checking job'})
  }
}



module.exports = {
  seedJobs,
  getAllActiveJobs,
  getJobById,
  submitResume,
  getApplicant,
  applyJob,
  checkAppliedJob,
};
