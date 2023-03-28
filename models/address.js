// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const addressSchema = new Schema(
    {
        UserId: {
            type: _Schema.Types.ObjectId,
            ref: "User",
        },
        Flat_FLoor_Tower: {
            type: String,
        },
        Street_Society: String,
        Recipients_Name: String,
        City: String,
        Pincode: String,
        defaultAddress: {
            default: false,
            type: Boolean
        }
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

const Address = model("Address", addressSchema);

export default Address;
