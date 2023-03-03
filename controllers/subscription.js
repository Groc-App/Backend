const { error } = require("console");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/orders");
const Subscription = require("../models/subscription");
var mongoose = require('mongoose');
const Address = require("../models/address");


exports.fetchAllSubscriptions = async (req, res) => {
    try {

        const subscriptions = await Subscription.find();


        if (!subscriptions) {
            return res.status(200).json({
                message: "No subscriptions Found"
            })
        }

        res.status(200).json({
            message: "Success",
            data: subscriptions
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.fetchSubscriptionByUser = async (req, res) => {
    try {
        const { number } = req.query;
        console.log(req.query)
        const user = await User.findOne({ number });

        if (!user) {
            return res.status(200).json({
                message: "No User Found",
                data: null
            })
        }

        const userId = user._id;

        const subscriptions = await Subscription.find({
            subscriber: userId
        }).populate('product').populate('address')

        if (!subscriptions) {
            return res.status(200).json({
                message: "No subscriptions Found"
            })
        }

        console.log(subscriptions);

        res.status(200).json({
            message: "Success",
            data: subscriptions
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.editSubscriptionByUser = async (req, res) => {
    try {

        const { number, quantity, address, endDate } = req.body;

        console.log(req.query);

        const filter = { number: number };
        const update = { quantity, address, endDate };

        const user = await User.findOneAndUpdate(filter, update);

        if (!user) {
            return res.status(200).json({
                message: "No User Found",
                data: null
            })
        }

        res.status(200).json({
            message: "User",
            data: user
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.cancelSubscriptionByUser = async (req, res) => {
    try {

        const { subscriptionId } = req.query;


        const user = await Subscription.findByIdAndRemove(subscriptionId);

        if (!user) {
            return res.status(200).json({
                message: "No User Found",
                data: null
            })
        }

        res.status(200).json({
            message: "User",
            data: user
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.createSubscription = async (req, res) => {
    try {
        const { productId, number, quantity, address, endDate } = req.body;

        console.log(req.body);
        //order detail = [{productid, quantity}]

        const user = await User.findOne({ Number: number });

        if (!user) {
            return res.status(200).json({
                message: "No User Found",
                data: null
            })
        }

        const userId = user._id;
        var prodId = mongoose.Types.ObjectId(productId);

        const adress = await Address.findById(address);

        console.log("Address id:", adress._id);
        var addressId = mongoose.Types.ObjectId(adress._id);



        if (!adress) {
            return res.status(400).json({ error: "num address found" });
        }

        const subscription = new Subscription({
            product: prodId,
            quantity,
            subscriptionStatus: true,
            startDate: Date.now(),
            endDate: Date.now(),
            address: addressId,
            subscriber: userId
        });
        await subscription.save();

        console.log("New Subcription", subscription);

        res.status(200).json({
            message: "Subscription Create Successfully",
            data: subscription
        })

    } catch (error) {

        res.status(400).json({ error: error.message });

    }
};

