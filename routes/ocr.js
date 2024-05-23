//dependencies
const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const { createWorker } = require("tesseract.js");

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
        res.status(200).json(textData);
        await worker.terminate();
      })();
    });
  });
});

module.exports = router;
