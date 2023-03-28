// import 'mongoose';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const addressSchema = new Schema(
    {
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
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

const Address = mongoose.model("Address", addressSchema);

export default Address
