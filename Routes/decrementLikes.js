const express = require("express");
const Property = require("../Models/propertyModel");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.post("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    property.likes = Math.max((property.likes || 0) - 1, 0);
    await property.save();

    res.json({ message: "Like Removed", property: property });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot remove like from the property" });
  }
});

module.exports = router;
