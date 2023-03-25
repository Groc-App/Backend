// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        Name: {
            type: String,
        },
        Products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        catNavImg: String,
        MainCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MainCategory",
        },
        imageurl: String
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.categoryId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
