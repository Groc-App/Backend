// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maincategorySchema = new Schema(
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
    Categories: [
      {
        type: Schema.ObjectId,
        ref: "Category",
      },
    ],
    imageurl: String,
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

const MainCategory = mongoose.model("MainCategory", maincategorySchema);

module.exports = MainCategory;
