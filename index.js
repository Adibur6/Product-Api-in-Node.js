const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const productRoutes = require("./routes/products");
const myProductRoutes = require("./routes/myProducts");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI);



app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to enable CORS for all routes

// Use the product routes
app.use("/products", productRoutes);

// Use the myProduct routes
app.use("/myproducts", myProductRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
