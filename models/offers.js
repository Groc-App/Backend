// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

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
                type: _Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        redeemedUsers: [
            {
                type: _Schema.Types.ObjectId,
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

const Offer = model("Offer", offerSchema);

export default Offer;
