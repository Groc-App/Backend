// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const categorySchema = new Schema(
    {
        Name: {
            type: String,
        },
        Products: [
            {
                type: _Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        MainCategory: {
            type: _Schema.Types.ObjectId,
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

const Category = model("Category", categorySchema);

export default Category;
