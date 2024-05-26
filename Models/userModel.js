const mongoose = require("mongoose");

const Rentifyuser = mongoose.model("rentifyuser", {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  postedProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rentifyproperty",
    },
  ],
});

module.exports = Rentifyuser;
