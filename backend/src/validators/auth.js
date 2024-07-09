const { body } = require("express-validator");

const validateRegistrationData = [
  body("password", "password is required").notEmpty(),
  body(
    "password",
    "password length min is 8 and max is 50 characters"
  ).isLength({ min: 8, max: 50 }),
  body("name", "name is required").notEmpty(),
  body("description", "description is required").notEmpty(),
];

const validateCheckEmail = [
  body("email", "email is required").notEmpty().isEmail(),
];

const validateLoginData = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty(),
];

const validateRefreshToken = [
  body("refresh", "valid refresh token is requred").notEmpty().isJWT(),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
  validateCheckEmail,
};
