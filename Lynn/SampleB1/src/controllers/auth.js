const AuthModel = require("../models/Auth");
const Applicants = require("../models/Applicants");
const Employers = require("../models/Employers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const users = await AuthModel.find();
    const outputArray = [];
    for (const user of users) {
      outputArray.push({ email: user.email, role: user.role });
    }
    res.json(outputArray);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

//8/7 shorten register function
const checkValidEmail = async (req, res) => {
  try {
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }
    res.json({ status: "ok", msg: "email is valid" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "email check failed" });
  }
};

//8/7 - new function
const register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    await AuthModel.create({
      email: req.body.email,
      hash,
      role: req.body.role || "Job Seeker",
    });
    if (req.body.role === "Job Seeker") {
      await Applicants.create({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
      });
    } else {
      await Employers.create({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
      });
    }
    res.status(200).json({
      status: "ok",
      msg: "Registration is complete. User is created.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: "error", msg: "Invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(401).json({ status: "error", msg: "not authorized" });
    }

    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = { email: auth.email, role: auth.role };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = { email: decoded.email, role: decoded.role };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refresh failed" });
  }
};

module.exports = {
  getAllUsers,
  checkValidEmail,
  login,
  refresh,
  register,
};
