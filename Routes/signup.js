const express = require("express");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.use(cors());

router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "Signup Page Of Rentify" });
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password } = req.body;

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "* Email is invalid" });
    }

    const allUsers = await User.find();

    let isMobileExists = false;
    let isEmailExists = false;

    allUsers.forEach((user) => {
      if (user.mobile.toString() === mobile) {
        isMobileExists = true;
      }
      if (user.email === email) {
        isEmailExists = true;
      }
    });

    if (isMobileExists) {
      return res.status(400).json({ error: "* Mobile number already exists" });
    }

    if (isEmailExists) {
      return res.status(400).json({ error: "* Email already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const jwttoken = jwt.sign({ email }, process.env.JWT_SECRETKEY, {
      expiresIn: "24h",
    });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password: encryptedPassword,
    });

    return res.status(200).json({
      message: "User created successfully",
      data: newUser,
      jwttoken: jwttoken,
      userId: newUser._id,
      
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error:
        "User cannot be created. Something went wrong. Please try again after some time",
    });
  }
});

module.exports = router;
