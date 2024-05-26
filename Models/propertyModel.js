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
    type: Number,
    required: true,
  },
  noOfBathrooms: {
    type: Number,
    required: true,
  },
  noOfBalconies: {
    type: Number,
    required: true,
  },
  noOfHospitalsNearby: {
    type: Number,
    required: true,
  },
  squareFootage: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
  },
});

module.exports = Rentifyproperty;
