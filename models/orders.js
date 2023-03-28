// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const orderSchema = new Schema({
    OrderId: String,
    TotalAmount: Number,
    OrderStatus: String,
    Date: Date,
    Addres: {
        type: _Schema.Types.ObjectId,
        ref: 'Address',
    },
    OrderDetails: [{
        Product: {
            type: _Schema.Types.ObjectId,
            ref: 'Product',
        },
        Quantity: Number
    }
    ],
    User: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
    },
},
    // {
    //     toJSON: {
    //         transform: function (doc, ret) {
    //             // ret.OrderId = ret._id.toString();
    //             delete ret._id;
    //             delete ret.__v;
    //         },
    //     },
    // }
);

const Order = model("Order", orderSchema);

export default Order;
