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
        MainCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MainCategory",
        },
<<<<<<< HEAD
        imageurl: String
=======
>>>>>>> 3f076c7d4cd2d0e12090d4569cbae6606e0c3b22
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
