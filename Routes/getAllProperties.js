const express = require("express");
const Property = require("../Models/propertyModel");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { state, city, price } = req.body;

    const filter = {};
    if (state) filter.state = state;
    if (city) filter.city = city;
    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      filter.price = { $gte: minPrice };
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const properties = await Property.find(filter);
    res.json({ properties: properties });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot add property" });
  }
});

module.exports = router;
