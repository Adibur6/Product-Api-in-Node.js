const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // You can choose any port you like

mongoose.connect("mongodb://127.0.0.1:27017/Products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  id: String,
  price: Number,
  unit: String,
  availableAmount: Number,
});

const Product = mongoose.model("Product", productSchema);

app.use(bodyParser.json());

// Set up your API routes
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, id, price, unit, availableAmount } = req.body;

    // Create a new product instance and validate it
    const newProduct = new Product({ name, id, price, unit, availableAmount });
    const { error } = newProduct.validateSync();

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate the request data against the schema
    const { name, price, unit, availableAmount } = req.body;
    const productData = { name, price, unit, availableAmount };
    const { error } = productSchema.validate(productData);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOneAndRemove({ id: productId });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
