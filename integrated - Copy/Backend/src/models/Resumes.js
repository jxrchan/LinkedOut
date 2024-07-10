const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "Applicants" },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs"},
    document: {type: String},
  },
  { collection: "resumes" }
);

module.exports = mongoose.model("Resumes", ResumeSchema);
