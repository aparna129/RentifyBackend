const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/userModel");
const Property = require("../Models/propertyModel");
const cors = require("cors");

const router = express.Router();

router.use(express.json());

router.use(cors());

router.post("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
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

    const property = await Property.create({
      userId: userId,
      state,
      city,
      area,
      noOfBedrooms,
      noOfBathrooms,
      noOfBalconies,
      noOfHospitalsNearby,
      squareFootage,
      price,
    });

    res.json({ message: "Property Added Successfully", property: property });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot add property" });
  }
});

module.exports = router;
