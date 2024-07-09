const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    //below allows for termination
    status: { type: String, enum: ["active", "terminated"], default: "active" },
    position: { type: String, require: true, minLength: 1, maxLength: 50 },
    description: { type: String, require: true, minLength: 1, maxLength: 2000 },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Applicants" }],
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "Employers" },
    created: { type: Date, default: Date.now },
    updated: { type: Date },
  },
  { collection: "jobs" },
  { strict: false }
);

module.exports = mongoose.model("Jobs", JobSchema);
