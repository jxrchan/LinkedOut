const express = require("express");
const router = express.Router();
const {
  seedBooks,
  getBookById,
  getAllBooks,
  addNewBook,
  deleteOneBookById,
  updateOneBook,
} = require("../controllers/books");

const {
  validateIdInBody,
  validateIdInParam,
  validateAddBookData,
  validateUpdateBookData,
} = require("../validators/books");
const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");

router.get("/books/seed", authAdmin, seedBooks);
router.get("/books", auth, getAllBooks);
router.post("/books", auth, validateIdInBody, checkErrors, getBookById);
router.put("/books", authAdmin, validateAddBookData, checkErrors, addNewBook);
router.delete(
  "/books/:id",
  authAdmin,
  validateIdInParam,
  checkErrors,
  deleteOneBookById
);
router.patch(
  "/books/:id",
  authAdmin,
  validateIdInParam,
  validateUpdateBookData,
  checkErrors,
  updateOneBook
);

module.exports = router;
