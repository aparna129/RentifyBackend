const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRETKEY);
      if (user) {
        next();
        return;
      }
    } else {
      return res
        .status(400)
        .json({ error: "* Token invalid or expired, Please login again" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "* Token invalid or expired, Please login again" });
  }
};

module.exports = { isLoggedIn };
