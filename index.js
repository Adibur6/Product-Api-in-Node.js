const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const myProductRoutes = require("./routes/myProducts");

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/Products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Product schema and model

app.use(bodyParser.json());

// Use the product routes
app.use("/products", productRoutes);

// Use the myProduct routes
app.use("/myproducts", myProductRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
