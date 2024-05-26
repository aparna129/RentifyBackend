const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const signupRoute = require("./Routes/signup");
const loginRoute = require("./Routes/login");
const addPropertyRoute = require("./Routes/addProperty");
const deletePropertyRoute = require("./Routes/deleteProperty");
const editPropertyRoute = require("./Routes/editProperty");
const getUserPropertiesRoute = require("./Routes/getUserProperties");
const getAllPropertiesRoute = require("./Routes/getAllProperties");
const getUserDetailsRoute = require("./Routes/getSellerDetails");
const incrementLikesRoute = require("./Routes/incrementLikes");
const decrementLikesRoute = require("./Routes/decrementLikes");
const sendEmailRoute = require("./Routes/sendEmail");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/addProperty", addPropertyRoute);
app.use("/deleteProperty", deletePropertyRoute);
app.use("/editProperty", editPropertyRoute);
app.use("/getUserProperties", getUserPropertiesRoute);
app.use("/getAllProperties", getAllPropertiesRoute);
app.use("/getUserDetails", getUserDetailsRoute);
app.use("/likeProperty", incrementLikesRoute);
app.use("/dislikeProperty", decrementLikesRoute);
app.use("/sendEmail", sendEmailRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Rentify!");
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Database and Server connected successfully"))
    .catch((error) => console.log(error));
});
