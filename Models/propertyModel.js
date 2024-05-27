const mongoose = require("mongoose");

const Rentifyproperty = mongoose.model("rentifyproperty", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rentifyuser",
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  noOfBedrooms: {
    type: String,
    required: true,
  },
  noOfBathrooms: {
    type: String,
    required: true,
  },
  noOfBalconies: {
    type: String,
    required: true,
  },
  noOfHospitalsNearby: {
    type: String,
    required: true,
  },
  squareFootage: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
});

module.exports = Rentifyproperty;
