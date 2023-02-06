// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maincategorySchema = new Schema({
    Name: {
        type: String,
    },
    Products: [{
        type: Schema.ObjectId,
        ref: 'Product',
    }],
    Categories: [{
        type: Schema.ObjectId,
        ref: 'Category',
    }]
});

const MainCategory = mongoose.model("MainCategory", maincategorySchema);

module.exports = MainCategory;
