require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const medicineRoutes = require("./routes/medicine");
const ocrRoutes = require("./routes/ocr");
const MONGO_DB_URL = process.env.MONGO_DB_URL || process.env.DB_URL;
const userRoutes = require("./routes/user");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("./models/user");
const session = require("express-session");
const cors = require("cors");
mongoose.connect(MONGO_DB_URL).then(() => {
  console.log("mongoDB running");
});
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credential", "true");
  res.send("Backend APIs Running");
});
app.use(
  session({
    secret: "hello world",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(medicineRoutes);
app.use(userRoutes);
app.use(ocrRoutes);

app.listen(PORT, () => {
  console.log("port running on", PORT);
});
