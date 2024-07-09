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
router.post("/register", checkValidEmail);
router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
