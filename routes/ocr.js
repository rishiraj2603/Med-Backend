//dependencies
require("dotenv").config();
const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const { createWorker } = require("tesseract.js");
const PRESET_NAME=process.env.PRESET_NAME;
const  CLOUD_API_KEY=process.env.CLOUD_API_KEY;
const CLOUD_NAME=process.env.CLOUD_NAME;

//storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("avatar");

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
      if (err) return console.log("This is your Error", err);

      (async () => {
        const worker = await createWorker("eng");
        const ret = await worker.recognize(data);
        const textData = ret.data.text;
        //console.log(ret.data.text);
        res.status(200).json({PRESET_NAME, CLOUD_API_KEY, CLOUD_NAME, textData});
        await worker.terminate();
      })();
    });
  });
});

module.exports = router;
