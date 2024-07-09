const Roles = require("../models/Roles");

const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.json(roles.map((item) => item.role));
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "cannot get roles" });
  }
};

module.exports = { getAllRoles };
