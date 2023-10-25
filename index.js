const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can choose any port you like

mongoose.connect('mongodb://127.0.0.1:27017', {
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

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

// Set up your API routes
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
