const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 1, maxLength: 50 },
    description: {type: String, required: true},
    email: { type: String, require: true, minLength: 1, maxLength: 50 },
    jobs_applied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }],
    resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resumes" }],
  },
  { collection: "applicants" }
);

module.exports = mongoose.model("Applicants", ApplicantSchema);
