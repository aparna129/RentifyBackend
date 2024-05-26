const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/userModel");
const Property = require("../Models/propertyModel");
const { isLoggedIn } = require("../Middleware/LoggedInOrNot");
const cors = require("cors");

const router = express.Router();

router.use(express.json());

router.use(cors());

router.put("/:propertyId", isLoggedIn, async (req, res) => {
  try {
    const { propertyId } = req.params;

    const {
      state,
      city,
      area,
      noOfBedrooms,
      noOfBathrooms,
      noOfBalconies,
      noOfHospitalsNearby,
      squareFootage,
      price,
    } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const missingFields = [];
    if (!state) missingFields.push("State");
    if (!city) missingFields.push("City");
    if (!area) missingFields.push("Area");
    if (!noOfBedrooms) missingFields.push("No Of Bedrooms");
    if (!noOfBathrooms) missingFields.push("No Of Bathrooms");
    if (!noOfBalconies) missingFields.push("No Of Balconies");
    if (!noOfHospitalsNearby) missingFields.push("No Of Hospitals Nearby");
    if (!squareFootage) missingFields.push("Square Footage");
    if (!price) missingFields.push("Price");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `${missingFields.join(" , ")} are required`,
      });
    }

    property.state = state;
    property.city = city;
    property.area = area;
    property.noOfBedrooms = noOfBedrooms;
    property.noOfBathrooms = noOfBathrooms;
    property.noOfBalconies = noOfBalconies;
    property.noOfHospitalsNearby = noOfHospitalsNearby;
    property.squareFootage = squareFootage;
    property.price = price;

    await property.save();

    res.json({ message: "Property edited successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Cannot edit property" });
  }
});

module.exports = router;
