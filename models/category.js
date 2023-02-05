// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    Name: {
        type: String,
    },
    Products: [{
        type: Schema.ObjectId,
        ref: 'Product',
    }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
