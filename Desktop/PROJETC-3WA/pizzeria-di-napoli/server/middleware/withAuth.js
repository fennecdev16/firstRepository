const jwt = require("jsonwebtoken");

const withAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.json({ status: 401, msg: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.json({ status: 403, msg: "Forbiden" });
    } else {
      req.userId = decoded.aud;

      next();
    }
  });
};

module.exports = withAuth;
