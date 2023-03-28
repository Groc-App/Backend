// import { Int32 } from 'bson';
// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const userSchema = new Schema({
    Number: {
        type: String,
    },
    Address: [{
        type: _Schema.Types.ObjectId,
        ref: "Address",
    }],
    Order: [{
        type: _Schema.Types.ObjectId,
        ref: 'Order',
    }],
    products: [{                                            // ye array of cart items h
        type: _Schema.Types.ObjectId,
        ref: 'CartItem',
    }],
    selectedAddress: {
        Flat_FLoor_Tower: String,
        Street_Society: String,
        Recipients_Name: String,
        City: String,
        Pincode: Number,
    },
    referralOffer: {
        referredPeople: {
            type: Number,
            default: 0
        },
        isClaimed: {
            type: Number,
            default: 0
        }
    },
    referralCode: String,
    refferedBy: {
        type: String,
        default: null

    }
});

const User = model("User", userSchema);

export default User;
