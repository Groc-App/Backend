import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Name: {
        type: String,
    },
    Price: Number,
    Description: String,
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
    },
    Quantity: Number,
    Company: String,
    ImageUrl: String,
});

const Product = mongoose.model("User", productSchema);

module.exports = Product;
