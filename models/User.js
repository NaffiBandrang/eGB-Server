// Modules and Dependencies
const mongoose = require("mongoose");
const Product = require("./Product");

// Schema/Blueprint
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },

	email: {
		type: String,
		required: [true, "Email is required"]
	},

    mobileNo: {
        type: Number,
        required: [true, "Mobile Number is required"]
    },

	password: {
		type: String,
		required: [true, "Password is required"]
	},

	isAdmin: {
		type: Boolean,
		default: false
	},

    orderedProduct: [
        {
            products: [{
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },

                productName: {
                    type: String,
                    required: [true, "Product Name is required"]
                },

                quantity: {
                    type: Number,
                    required: [true, "Quantity is required"]
                }
            }],

            totalAmount: {
                type: Number
                
            },

            purchasedOn: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

// Model
module.exports = mongoose.model("User", userSchema);