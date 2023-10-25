const Product = require("../models/products");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
      const { name, id, price, unit, availableAmount } = req.body;
      if (!name || !id || !price || !unit || !availableAmount) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const newProduct = new Product({ name, id, price, unit, availableAmount });
      const { error } = Product.validate(newProduct);
      console.log(error);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Server error." });
  }
};

exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Validate the request data against the schema
      const { name, id, price, unit, availableAmount } = req.body;
      if (!name || !id || !price || !unit || !availableAmount) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if(productId!=id)
      {
          return res.status(400).json({ error: "Body id does not match route id." });
      }
      const productData = { name, price, unit, availableAmount };
      const { error } = Product.validate(productData);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedProduct = await Product.findOneAndUpdate({ id: productId }, productData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findOneAndRemove({ id: productId });
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ message: 'Product deleted' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };