// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./category");

const productSchema = new Schema({
    Name: {
        type: String,
    },
    Price: Number,
    Description: String,
    Category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    Quantity: String,
    Company: String,
    ImageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
