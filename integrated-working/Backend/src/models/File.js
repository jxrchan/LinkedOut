const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  contentType: {
    type: String,
  },
  data: {
    type: Buffer,
  },
});

module.exports = mongoose.model("File", FileSchema);
