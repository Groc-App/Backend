// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const subscriptionSchema = new Schema({
    product: {
        type: _Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: Number,
    subscriptionStatus: Boolean,
    startDate: Date,
    endDate: Date,
    address: {
        type: _Schema.Types.ObjectId,
        ref: 'Address',
    },
    subscriber: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.subscriptionId = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            delete ret.subscriber;
        },
    },
});

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;
