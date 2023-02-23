// import { Int32 } from 'bson';
// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Number: {
        type: String,
    },
    Address: [{
        Flat_FLoor_Tower: String,
        Street_Society: String,
        Recipients_Name: String,
        City: String,
        Pincode: String,
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
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
