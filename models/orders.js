// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./category");

const orderSchema = new Schema({
    OrderId:String,
    TotalAmount:Number,
    OrderStatus:String,
    Date: Date,
    OrderDetails:[{
        Product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        Quantity:Number
    }
    ],
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
