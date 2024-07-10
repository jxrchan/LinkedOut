const express = require("express");
const router = express.Router();

const {
  seedJobs,
  getJobById,
  getAllJobs,
  submitResume,
} = require("../controllers/jobList");

const {
  validateIdInBody,
  validateIdInParam,
  validateAddBookData,
  validateUpdateBookData,
} = require("../validators/books");
const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");

// router.get("/books/seed", authAdmin, seedBooks);
router.get("/jobs/seed", seedJobs);
// router.get("/books", auth, getAllBooks);
router.get("/jobs", getAllJobs);
router.post("/jobs", getJobById);
router.post("/jobs/resume/:id", submitResume);
// router.put("/books", authAdmin, validateAddBookData, checkErrors, addNewBook);
// router.delete(
//   "/books/:id",
//   authAdmin,
//   validateIdInParam,
//   checkErrors,
//   deleteOneBookById
// );
// router.patch(
//   "/books/:id",
//   authAdmin,
//   validateIdInParam,
//   validateUpdateBookData,
//   checkErrors,
//   updateOneBook
// );

module.exports = router;
