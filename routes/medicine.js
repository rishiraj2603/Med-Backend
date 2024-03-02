const router = require("express").Router();
const Medicine = require("../models/medicine");

router.get("/medicine", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = 36;
    const startIndex = (page - 1) * pageSize;
    const medicineData = await Medicine.find()
      .sort({ generic_id: 1 })
      .skip(startIndex)
      .limit(pageSize);
    const medicineCount = await Medicine.countDocuments({});
    const totalPages = Math.ceil(medicineCount / pageSize);
    res.status(200).json({ medicineData, totalPages, page });
  } catch (error) {
    console.log(error);
  }
});
router.get("/medicine/:medicineId", async (req, res) => {
  try {
    const { medicineId } = req.params;
    const med = await Medicine.find({ generic_id: medicineId });
    // console.log("🚀 ~ router.get ~ med:", med);
    res.status(200).json(med);
  } catch (error) {
    console.log(error);
  }
});

router.get("/search", async (req, res) => {
  try {
    const medicineName = req.query.medicineName;
    const med = await Medicine.find({
      generic_name: { $regex: `${medicineName}`, $options: "i" },
    });
    res.status(200).json(med);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
