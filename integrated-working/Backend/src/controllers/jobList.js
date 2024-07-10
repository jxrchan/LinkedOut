// const JobList = require("../models/JobList");
const JobListModel = require("../models/Jobs");

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

const getAllJobs = async (req, res) => {
  try {
    const allJobs = await JobListModel.find();
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

const submitResume = async function (req, res) {
  try {
    // IN REQ.FILES.”YOUR_FILE_NAME” WILL BE PRESENT
    const file = req.files;
    const bodyData = req.body;
    // console.log(file);
    // console.log(bodyData);

    res.status(200).send({
      message: "FILE RECEIVED!",
    });
  } catch (error) {
    res.send("File Upload Error");
  }
};

// const addNewBook = async (req, res) => {
//   try {
//     const newBook = {
//       title: req.body.title,
//       author: req.body.author,
//       year_pbulished: req.body.year,
//     };

//     await BooksModel.create(newBook);
//     res.json({ status: "ok", msg: "book saved" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error saving books" });
//   }
// };

// const addNewBook = async (req, res) => {
//   try {
//     const newBook = {
//       title: req.body.title,
//       author: req.body.author,
//       year_published: req.body.year,
//     };

//     const newBookModel = new BooksModel(newBook);
//     await newBookModel.save();

//     res.json({ status: "ok", msg: "book saved" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error saving books" });
//   }
// };

// const deleteOneBookById = async (req, res) => {
//   try {
//     await BooksModel.findByIdAndDelete(req.params.id);
//     res.json({ status: "ok", msg: "book deleted" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error deleting book" });
//   }
// };

// const updateOneBook = async (req, res) => {
//   try {
//     const updateBook = {
//       title: req.body.title,
//       author: req.body.author,
//       year_published: req.body.year,
//     };
//     // const updateBook = {};
//     // if ("title" in req.body) updateBook.title = req.body.title;
//     // if ("author" in req.body) updateBook.author = req.body.author;
//     // if ("year" in req.body) updateBook.year_published = req.body.year;
//     await BooksModel.findByIdAndUpdate(req.params.id, updateBook);
//     res.json({ status: "ok", msg: "book updated" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error updating book" });
//   }
// };

module.exports = {
  seedJobs,
  getAllJobs,
  getJobById,
  submitResume,
};
