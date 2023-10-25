const mongoose = require("mongoose");

const myProductSchema = new mongoose.Schema({
  name: String,
  id: String,
  price: Number,
  unit: String,
  selectedAmount: Number,
});

module.exports = mongoose.model("MyProduct", myProductSchema);
