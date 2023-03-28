// import { Int32 } from 'bson';
// import 'mongoose';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Number: {
        type: String,
    },
    Address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    }],
    Order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],
    products: [{                                            // ye array of cart items h
        type: mongoose.Schema.Types.ObjectId,
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

const User = mongoose.model("User", userSchema);

export default User

