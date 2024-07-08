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
const checkErrors = require("../validators/checkErrors");
const { authAdmin } = require("../middleware/auth");

router.get("/users", authAdmin, getAllUsers);
router.post("/register", validateCheckEmail, checkErrors, checkValidEmail);
router.put("/register", validateRegistrationData, checkErrors, register)
router.post("/login", validateLoginData, checkErrors, login);
router.post("/refresh", validateRefreshToken, checkErrors, refresh);


module.exports = router;
