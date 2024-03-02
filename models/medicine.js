const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  generic_id: Number,
  generic_name: String,
  precaution: String,
  indication: String,
  dose: String,
  contra_indication: String,
  side_effect: String,
  pregnancy_category_id: Number,
  mode_of_action: String,
  interaction: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
