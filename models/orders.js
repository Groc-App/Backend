// import 'mongoose';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    OrderId: String,
    TotalAmount: Number,
    OrderStatus: String,
    Date: Date,
    Addres: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    OrderDetails: [{
        Product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        Quantity: Number
    }
    ],
    User: {
        type: mongoose.Schema.Types.ObjectId,
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

const Order = mongoose.model("Order", orderSchema);

export default Order

