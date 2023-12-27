// Dependencies and Modules
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");
const {verify, verifyAdmin} = auth;

// Routing Component
const router = express.Router();

// Routes

// Route for Creating New Product
router.post("/add", verify, verifyAdmin, productController.addProduct);

// For retrieving All Products
router.get("/all", productController.getAllProducts);

// For retrieving All Active Products
router.get("/active", productController.getAllActiveProducts);

// For retrieving a specific product
router.get("/:productId", productController.getProduct);

// For Updating Product Information
router.put("/:productId", verify, verifyAdmin, productController.updateProduct);

// For Archiving Product
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

// For Activating Product
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

// FOr Searching Product by name
router.post('/search', productController.searchProductsByName);

// Export the router object
module.exports = router;