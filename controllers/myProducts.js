const MyProduct = require("../models/myProducts");

exports.getMyProducts = async (req, res) => {
  try {
    const myProducts = await MyProduct.find();
    res.json(myProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createMyProduct = async (req, res) => {
  try {
    const { name, id, price, unit, selectedAmount } = req.body;
    if (!name || !id || !price || !unit || !selectedAmount) {
        return res.status(400).json({ error: "Missing required fields" });
      }
    const newMyProduct = new MyProduct({ name, id, price, unit, selectedAmount });
    
    const { error } = MyProduct.validate(newMyProduct);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    await newMyProduct.save();
    res.json(newMyProduct);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.updateMyProduct = async (req, res) => {
  try {
    const myProductId = req.params.id;
    const { name, price, id, unit, selectedAmount } = req.body;
    if (!name || !id || !price || !unit || !selectedAmount) {
        return res.status(400).json({ error: "Missing required fields" });
      }
    if(myProductId!=id)
    {
        return res.status(400).json({ error: "Body id does not match route id." });
    }
    const myProductData = { name, price, unit, selectedAmount };
    const { error } = MyProduct.validate(myProductData);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedMyProduct = await MyProduct.findOneAndUpdate(
      { id: myProductId },
      myProductData,
      { new: true }
    );

    if (!updatedMyProduct) {
      return res.status(404).json({ error: "MyProduct not found" });
    }

    res.json(updatedMyProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteMyProduct = async (req, res) => {
  try {
    const myProductId = req.params.id;
    const myProduct = await MyProduct.findOneAndRemove({ id: myProductId });

    if (!myProduct) {
      res.status(404).json({ error: "MyProduct not found" });
    } else {
      res.json({ message: "MyProduct deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
exports.deleteAllMyProducts = async (req, res) => {
  try {
    await MyProduct.deleteMany({}); // Deletes all myProducts
    res.json({ message: "All myProducts deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};