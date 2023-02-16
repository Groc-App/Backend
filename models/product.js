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
<<<<<<< HEAD
      console.log("return id:", ret._id);
      ret.productId = ret._id.toString();
=======
      if(ret._id)
      {
        ret.productId = ret._id.toString();
      }
>>>>>>> c7603d8b91655bf6f7e29ac5ee488a40906036a5
      delete ret._id;
      delete ret.__v;
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
