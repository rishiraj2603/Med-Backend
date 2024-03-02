const router = require("express").Router();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    await User.create({ email, password, username });
    res.status(201).json();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
