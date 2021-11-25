require("dotenv").config();
const express = require("express");
const Admin = require("../models/Admin");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//ADD NEW USER
router.post("/register", async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    mo_no: req.body.mo_no,
    password: hash,
  });

  try {
    const savedAdmin = await admin.save();
    res.status(200).json(savedAdmin);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

//login
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await Admin.findOne({ email: email }).lean(true);
  if (!admin)
    return res.status(401).json({ msg: "invalid username or password" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match)
    return res.status(401).json({ msg: "invalid username or password" });

  const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET);
  res.json({
    accessToken: accessToken,
    admin: admin,
    msg: "Login successfully",
  });
});

module.exports = router;
