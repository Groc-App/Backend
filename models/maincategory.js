// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const maincategorySchema = new Schema(
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
    Categories: [
      {
        type: _Schema.Types.ObjectId,
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

const MainCategory = model("MainCategory", maincategorySchema);

export default MainCategory;
