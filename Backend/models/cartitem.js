// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartitemSchema = new Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
  Item: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
  },
  ItemCount: Number,
});

const CartItem = mongoose.model("CartItem", cartitemSchema);

module.exports = CartItem;
