const Jobs = require("../models/Jobs");
const Applicants = require("../models/Applicants");
const Employers = require("../models/Employers");
const Resumes = require("../models/Resumes");

// Seeding Applicants
const seedApplicants = async (req, res) => {
  try {
    await Applicants.deleteMany({});
    await Applicants.create([
      { name: "Amos", description: "29yo male", email: "amos@amos.com" },
      {
        name: "Brenda",
        description: "19yo poly graduate",
        email: "brenda@brenda.com",
      },
      {
        name: "Chelsea",
        description: "59yo Karen",
        email: "chelsea@chelsea.com",
      },
    ]);
    res.status(200).json({ status: "ok", msg: "seeded applicants" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error seeding" });
  }
};

// Applying Jobs for Applicants
// const applyJob = async (req, res) => {
//   try {
//     const applicant = await Applicants.findById(req.body.applicantId);
//     console.log(applicant);
//     applicant.jobs_applied.push(req.body.jobId);
//     await applicant.save();

//     const job = await Jobs.findById(req.body.jobId);
//     console.log(job);
//     job.applicants.push(req.body.applicantId);
//     await job.save();

//     await Resumes.create({
//       applicant: req.body.applicantId,
//       job: req.body.jobId,
//       document: req.body.resumeDocument,
//     });
//     res.status(200).json({ status: "ok", msg: "applied job" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error applying for job" });
//   }
// };

// Seeding Employers
const seedEmployers = async (req, res) => {
  try {
    await Employers.deleteMany({});
    await Employers.create([
      {
        name: "Tan Ah Kow Enterprises",
        description: "Contractor Services",
        logo: "Logo URL",
        email: "tanahkow@gmail.com",
      },
      {
        name: "General Assembly",
        description: "IT Educations",
        logo: "Logo URL",
        email: "GeneralAssembly@gmail.com",
      },
    ]);
    res.status(200).json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error seeding employers" });
  }
};

const postEmployerDetails = async (req, res) => {
  try {
    const newEmployer = {
      name: req.body.name,
      description: req.body.description,
      logo: req.body.logo,
      email: req.body.email,
      hash: req.body.hash,
    };
    await Employers.create(newEmployer);
    res.status(200).json({ status: "ok", msg: "completed sign-up" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error completing employer details" });
  }
};

const getEmployerDetails = async (req, res) => {
  try {
    const employer = await Employers.findById(req.params.id);
    res.json(employer);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error getting employer details" });
  }
};

const updateEmployerDetails = async (req, res) => {
  try {
    const updatedDetails = {};
    if (req.body.name) {
      updatedDetails.name = req.body.name;
    }
    if (req.body.description) {
      updatedDetails.description = req.body.description;
    }
    if (req.body.logo) {
      updatedDetails.logo = req.body.logo;
    }
    await Employers.findByIdAndUpdate(req.params.id, updatedDetails);
    res.status(200).json({ status: "ok", msg: "updated employer details" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error updating employer details" });
  }
};

const getOneEmployer = async (req, res) => {
  try {
    if (req.body.email) {const employer = await Employers.findOne({ email: req.body.email });
    res.json(employer);}
    else if (req.body.id) {const employer = await Employers.findById(req.body.id);
      res.json(employer)
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting employer" });
  }
};

// Employer Dashboard
const getEmployerAllActiveJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({
      status: "active",
      employer: req.params.id,
    });
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting jobs" });
  }
};

const getEmployerAllTerminatedJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({
      status: "terminated",
      employer: req.params.id,
    });
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting jobs" });
  }
};

const createJob = async (req, res) => {
  try {
    const newJob = await Jobs.create({
      position: req.body.position,
      description: req.body.description,
      employer: req.body.employer,
    });
    const employer = await Employers.findById(req.body.employer);
    employer.jobs.push(newJob._id);
    await employer.save();

    res.status(200).json({ status: "ok", msg: "created new job listing" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error creating new job listing" });
  }
};

const deleteJob = async (req, res) => {
  try {
    await Resumes.deleteMany({ job: req.params.id });
    const applicants = await Applicants.find({
      jobs_applied: { $in: [req.params.id] },
    });
    for (const applicant of applicants) {
      const idx = applicant.jobs_applied.indexOf(req.params.id);
      applicant.jobs_applied.splice(idx, 1);
      await applicant.save();
    }
    await Jobs.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ok", msg: "deleted job listing" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error deleting job listing" });
  }
};

const updateJob = async (req, res) => {
  try {
    const updatedDetails = {};
    if (req.body.position) {
      updatedDetails.position = req.body.position;
    }
    if (req.body.description) {
      updatedDetails.description = req.body.description;
    }
    updatedDetails.updated = new Date(Date.now());
    await Jobs.findByIdAndUpdate(req.body.id, updatedDetails);
    res.status(200).json({ status: "ok", msg: "updated job" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error updating job" });
  }
};

const terminateJob = async (req, res) => {
  try {
    await Jobs.findByIdAndUpdate(req.params.id, { status: "terminated" });
    res.status(200).json({ status: "ok", msg: "terminated job listing" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error terminating job listing" });
  }
};

const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicants.find({
      jobs_applied: { $in: [req.params.id] },
    });
    res.json(applicants);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting applicants" });
  }
};

const getOneApplicantResume = async (req, res) => {
  try {
    const resume = await Resumes.findOne({
      applicant: req.params.applicantId,
      job: req.params.jobId,
    });
    res.json(resume.document);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error getting applicant resume" });
  }
};

module.exports = {
  seedApplicants,
  getOneEmployer,
  seedEmployers,
  getEmployerDetails,
  postEmployerDetails,
  updateEmployerDetails,
  getEmployerAllActiveJobs,
  getEmployerAllTerminatedJobs,
  // getEmployerOneJob,
  updateJob,
  deleteJob,
  createJob,
  terminateJob,
  getApplicants,
  getOneApplicantResume,
};
