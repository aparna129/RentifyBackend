const express = require("express");
const sendgridMail = require("@sendgrid/mail");
const cors = require("cors");

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.use(cors());

router.use(express.json());

router.post("/", (req, res) => {
  const { buyerEmail, sellerEmail,sellerContact, propertyDetails } = req.body;

  const emailData = {
    to: [buyerEmail, sellerEmail],
    from: "rentify@gmail.com",
    subject: "Property Inquiry",
    text: `Buyer details: ${buyerEmail}\nSeller details: ${sellerEmail},${sellerContact}\nProperty details: ${JSON.stringify(
      propertyDetails
    )}`,
  };

  sendgridMail
    .send(emailData)
    .then(() => {
      res.status(200).json({ message: "Emails sent successfully" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({
          error:
            "Seller details will be mailed to you and your details will be mailed to seller shortly",
        });
    });
});

module.exports = router;
