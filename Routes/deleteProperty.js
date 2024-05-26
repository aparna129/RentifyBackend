const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/userModel");
const Property = require("../Models/propertyModel");
const { isLoggedIn } = require("../Middleware/LoggedInOrNot");
const cors = require("cors");

const router = express.Router();

router.use(express.json());

router.use(cors());

router.delete("/:propertyId",isLoggedIn, async (req, res) => {
    try {
      const { propertyId } = req.params;
      const deletedProperty = await Property.findByIdAndDelete(propertyId);
  
      if (!deletedProperty) {
        return res.status(404).json({ error: "Property not found" });
      }
  
      res.json({ message: "Property deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Cannot delete property" });
    }
  });
  
  module.exports = router;
  