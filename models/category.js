import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    Name: {
        type: String,
    },
    Products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
    },
    Q
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
