// import 'mongoose';

const mongoose = require("mongoose");
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
        Flat_FLoor_Tower: String,
        // Street_Society: String,
        // Recipients_Name: String,
        // City: String,
        // Pincode: Number,
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

module.exports = Subscription;
