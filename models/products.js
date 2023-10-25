const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  id: String,
  price: Number,
  unit: String,
  availableAmount: Number,
});

module.exports = mongoose.model("Product", productSchema);
