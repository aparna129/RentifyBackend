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

    property.likes = (property.likes || 0) + 1;
    await property.save();

    res.json({message:"Like Added", property: property });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot like property" });
  }
});

module.exports = router;
