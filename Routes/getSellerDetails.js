const express = require("express");
const User = require("../Models/userModel");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId, "firstName lastName email");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot get user details" });
  }
});

module.exports = router;
