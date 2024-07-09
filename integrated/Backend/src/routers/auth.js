const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  checkValidEmail,
  login,
  refresh,
  register,
} = require("../controllers/auth");
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
  validateCompleteRegistration,
  validateCheckEmail,
} = require("../validators/auth");
const checkErrorsLogin = require("../validators/checkErrorsLogin");
const { authAdmin } = require("../middleware/auth");

router.get("/users", authAdmin, getAllUsers);
router.post("/register", validateCheckEmail, checkErrorsLogin, checkValidEmail);
router.put("/register", validateRegistrationData, checkErrorsLogin, register);
router.post("/login", validateLoginData, checkErrorsLogin, login);
router.post("/refresh", validateRefreshToken, checkErrorsLogin, refresh);

module.exports = router;
