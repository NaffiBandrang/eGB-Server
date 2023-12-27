// Dependencies and Modules
const express = require("express");

const userController = require("../controllers/user");

const auth = require("../auth");

const {verify, verifyAdmin} = auth;

// Routing Component
const router = express.Router();

// Routes

// Route for User Registration
router.post("/register", userController.registerUser);

// For Non-Admin User Checkout
router.post("/order",  verify, userController.createOrder);

// For Retrieving User Details
router.get("/details", verify, userController.getProfile);

// For Login User
router.post("/login", userController.loginUser);

// For Reset Password
router.post('/reset-password', verify, userController.resetPassword);

// For Updating Profile
router.put('/profile', verify, userController.updateProfile);

// For Updating User isAdmin status (Admin Only)
router.put("/:userId/update-user-as-admin", verify, verifyAdmin, userController.updateUserAsAdmin);

// For Updating Admin as User (Admin Only)
router.put("/:userId/update-admin-as-user", verify, verifyAdmin, userController.updateAdminAsUser);

// For retrieving User ordered products
router.get("/getUserOrderedProducts", verify, userController.getUserOrderedProducts);

// For retrieving all User's Ordered Products (Admin Only)
router.get("/allOrders", verify, verifyAdmin, userController.allOrders);

// For retrieving all Users
router.get("/allUsers", verify, verifyAdmin, userController.allUsers);

// Export Route System
module.exports = router;