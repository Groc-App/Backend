// import 'mongoose';

import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const maincategorySchema = new Schema(
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
    Categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
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

export default MainCategory;

