require("dotenv").config();
const Medicine = require("./models/medicine");
const medicineJSON = require("./Database/medicne.json");
const medicineData = medicineJSON.generics;
console.log("🚀 ~ medicineData:", medicineData);
const mongoose = require("mongoose");
const MONGO_DB_URL = process.env.MONGO_DB_URL || process.env.DB_URL;

mongoose.connect(MONGO_DB_URL).then(() => {
  console.log("mongoDB running");
});

const loadMedicine = async () => {
  await Medicine.deleteMany({});
  const dbOperations = medicineData.map((item) => {
    const medicine = new Medicine({
      generic_id: item.generic_id,
      generic_name: item.generic_name,
      precaution: item.precaution,
      dose: item.dose,
      indication: item.indication,
      contra_indication: item.contra_indication,
      side_effect: item.side_effect,
      pregnancy_category_id: item.pregnancy_category_id,
      mode_of_action: item.mode_of_action,
      interaction: item.interaction,
    });
    return medicine.save();
  });

  await Promise.all(dbOperations);
};

loadMedicine();
