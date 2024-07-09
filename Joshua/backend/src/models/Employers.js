const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 1, maxLength: 50 },
    description: { type: String, required: true, maxLength: 2000 },
    logo: { type: String, required: true },
    email: { type: String, minLength: 1, maxLength: 50 },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }],
  },
  { collection: "employers" }
);

module.exports = mongoose.model("Employers", EmployerSchema);
