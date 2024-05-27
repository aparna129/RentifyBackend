const express = require("express");
const Property = require("../Models/propertyModel");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { state, city } = req.body;

    const filter = {};
    if (state) filter.state = state;
    if (city) filter.city = city;

    const properties = await Property.find(filter);
    res.json({ properties: properties });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot add property" });
  }
});

module.exports = router;
