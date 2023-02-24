// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
    {
        Flat_FLoor_Tower: {
            type: String,
        },
        Street_Society: String,
        Recipients_Name: String,
        City: String,
        Pincode: String,
        defaultAddress: Boolean
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.addressId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
