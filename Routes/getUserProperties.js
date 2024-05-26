const express = require("express");
const Property = require("../Models/propertyModel");
const router = express.Router();
const cors = require("cors");
const { isLoggedIn } = require("../Middleware/LoggedInOrNot");

router.use(cors());

router.get("/:userId", isLoggedIn, async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Property.find({ userId: userId });
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot fetch user properties" });
  }
});

module.exports = router;
