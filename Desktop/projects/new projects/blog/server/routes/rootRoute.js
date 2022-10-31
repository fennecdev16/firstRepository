const express = require("express");
const router = express.Router();

router.get("^/$|/index(.html)?", (req, res) => {
  res.json({ msg: "Welcome to your my blog!!", status: 200 });
});

module.exports = router;
