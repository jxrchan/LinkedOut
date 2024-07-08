const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty(),
  body(
    "password",
    "password lenght min is 8 and max is 50 characters"
  ).isLength({ min: 8, max: 50 }),
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
};
