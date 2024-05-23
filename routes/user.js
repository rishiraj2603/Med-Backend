const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password, username } = req.body;
//     await User.create({ email, password, username });
//     res.status(201).json();
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/signin", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const userSave = await User.register(user, password);

    await userSave.save();
    res.status(201).json();
  } catch (error) {
    // res.render('error')
    console.log(error);
  }
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
