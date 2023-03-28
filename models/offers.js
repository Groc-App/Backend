// import 'mongoose';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const offerSchema = new Schema(
    {
        name: {
            type: String,
        },
        worth: Number,
        number: Number,
        description: String,
        claimedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        redeemedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ]
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.offerId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer

