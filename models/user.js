import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Number: {
        type: String,
    },
    Address: [{
        Flat_FLoor_Tower: String,
        Street_Society: String,
        Recipients_Name: String
    }],
    Order: [{}],
    CartItem: [{}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
