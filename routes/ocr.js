//dependencies
require("dotenv").config();
const router = require("express").Router();
const { createWorker } = require("tesseract.js");
const PRESET_NAME = process.env.PRESET_NAME;
const CLOUD_NAME = process.env.CLOUD_NAME;


router.get("/uploadValue", (req, res) => {
  res.status(200).json({ PRESET_NAME, CLOUD_NAME });
});

router.post("/uploadText", async (req, res) => {
  const { image } = req.body;
  console.log("🚀 ~ router.post ~ image:", image);

    (async () => {
      const worker = await createWorker("eng");
      const ret = await worker.recognize(image);
      const textData = ret.data.text;
      // console.log(ret.data.text);
      res.status(200).json({textData});
     //res.status(200).json({ message: "hello" });
      await worker.terminate();
    })();
  });

module.exports = router;
