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
  Category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  MainCategory: { type: Schema.ObjectId, ref: "MainCategory" },
  Quantity: String,
  Company: String,
  ImageUrl: String,
  MostSelling: Boolean,
}, {
  toJSON: {
    transform: function (doc, ret) {
      if(ret._id)
      {
        ret.productId = ret._id.toString();
      }
      delete ret._id;
      delete ret.__v;
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
