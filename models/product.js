// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
import Category from "./category";

const productSchema = new Schema({
  Name: {
    type: String,
  },
  Discount: Number,
  Price: Number,
  Description: String,
  Category: [
    {
      type: _Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  MainCategory: { type: Schema.ObjectId, ref: "MainCategory" },
  Quantity: String,
  Company: String,
  ImageUrl: [{
    type: String
  }],
  MostSelling: Boolean,
}, {
  toJSON: {
    transform: function (doc, ret) {
      if (ret._id) {
        ret.productId = ret._id.toString();
      }
      delete ret._id;
      delete ret.__v;
    },
  },
});

const Product = model("Product", productSchema);

export default Product;
