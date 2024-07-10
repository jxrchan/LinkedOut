const File = require("../models/File");

const uploadPdfFile = async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });
    await newFile.save();
    res.json({ file: newFile });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to upload file", error: err.message });
  }
};

const downloadPdfFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    });
    res.send(file.data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to download file", error: err.message });
  }
};

module.exports = { uploadPdfFile, downloadPdfFile };
