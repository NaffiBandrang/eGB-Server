// Modules and Dependencies
const mongoose = require("mongoose");

// Schema
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"]
    },

    description: {
        type: String,
        required: [true, "Description is required"]
    },

    price: {
        type: Number,
        required: [true, "Price is required"]
    },

    isActive: {
        type: Boolean,
        default: true
    },

    createdOn: {
        type: Date,
        default: new Date()
    },


});

// Model
module.exports = mongoose.model("Product", productSchema);