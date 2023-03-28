// import 'mongoose';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: Number,
    subscriptionStatus: Boolean,
    startDate: Date,
    endDate: Date,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
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

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription

