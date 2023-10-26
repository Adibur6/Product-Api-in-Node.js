const express = require("express");
const router = express.Router();
const myProductController = require("../controllers/myProducts");

// Define the myProducts routes
router.get("/", myProductController.getMyProducts);
router.post("/", myProductController.createMyProduct);
router.put("/:id", myProductController.updateMyProduct);
router.delete("/:id", myProductController.deleteMyProduct);
router.delete("/", myProductController.deleteAllMyProducts); // New route to delete all myProducts


module.exports = router;
