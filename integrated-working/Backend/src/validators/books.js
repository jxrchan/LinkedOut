const { body, param } = require("express-validator");

const validateIdInBody = [
  body("id", "id is invalid").not().isEmpty().isMongoId(),
];

const validateIdInParam = [param("id", "id is invalid").isMongoId()];

const validateAddBookData = [
  body("title", "title is required").notEmpty(),
  body("title", "must have a length between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("author", "author is required").notEmpty(),
  body("author", "author have a length between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("year", "year is required").notEmpty(),
  body("year", "must have be 1900 or greater").isInt({ min: 1900 }),
];

const validateUpdateBookData = [
  body("title", "title is required").optional().notEmpty(),
  body("title", "must have a length between 1 and 50 characters")
    .optional()
    .isLength({
      min: 1,
      max: 50,
    }),
  body("author", "author is required").optional().notEmpty(),
  body("author", "author have a length between 1 and 50 characters")
    .optional()
    .isLength({
      min: 1,
      max: 50,
    }),
  body("year", "year is required").optional().notEmpty(),
  body("year", "must have be 1900 or greater").optional().isInt({ min: 1900 }),
];

module.exports = {
  validateIdInBody,
  validateIdInParam,
  validateAddBookData,
  validateUpdateBookData,
};
