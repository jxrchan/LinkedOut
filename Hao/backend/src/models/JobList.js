const mongoose = require("mongoose");

const JobListSchema = new mongoose.Schema(
  {
    company: { type: String, require: true, minLength: 1, maxLength: 50 },
    title: { type: String, require: true, minLength: 1, maxLength: 50 },
    jobDes: { type: String, require: true, minLength: 1, maxLength: 1000 },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "jobList" }
);

module.exports = mongoose.model("JobList", JobListSchema);
