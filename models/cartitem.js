// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const cartitemSchema = new Schema({
  User: {
    type: _Schema.Types.ObjectId,
    ref: 'User',
  },
  Item: {
    type: _Schema.Types.ObjectId,
    ref: 'Product',
  },
  ItemCount: Number,
});

const CartItem = model("CartItem", cartitemSchema);

export default CartItem;
