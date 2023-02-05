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
                type: Schema.ObjectId,
                ref: "Product",
            },
        ],
        MainCategory: {
            type: Schema.ObjectId,
            ref: "MainCategory",
        },
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
