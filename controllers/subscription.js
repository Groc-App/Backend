import { error } from "console";
import { findOne } from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/orders";
import Subscription, { find, findByIdAndUpdate, findByIdAndRemove } from "../models/subscription.js";
import { Types } from 'mongoose';
import { findById } from "../models/address.js";


export async function fetchAllSubscriptions(req, res) {
    try {

        const subscriptions = await find();


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
}
export async function fetchSubscriptionByUser(req, res) {
    try {
        const { number } = req.query;
        (req.query)
        const user = await findOne({ Number: number });

        (user)
        if (!user) {
            ("inside no user")

            return res.status(200).json({
                message: "No User Found",
                data: null
            })
        }

        const userId = user._id;

        const subscriptions = await find({
            subscriber: userId
        }).populate('product').populate('address')

        if (!subscriptions) {
            ("inside no")
            return res.status(200).json({
                message: "No subscriptions Found"
            })
        }

        (subscriptions);

        res.status(200).json({
            message: "Success",
            data: subscriptions
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

export async function editSubscriptionByUser(req, res) {
    try {

        const { subsid, quantity, startDate, endDate, address } = req.body;
        (subsid, quantity, startDate, endDate, address);

        (req.query);

        const subscription = await findByIdAndUpdate(subsid, { quantity: quantity, startDate: startDate, endDate: endDate, address: address });

        // if (!user) {
        //     return res.status(200).json({
        //         message: "No User Found",
        //         data: null
        //     })
        // }

        return res.status(200).json({
            message: "Edited Successsfully",
            data: subscription
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function cancelSubscriptionByUser(req, res) {
    try {

        const { subscriptionId } = req.query;


        const user = await findByIdAndRemove(subscriptionId);

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
}

export async function createSubscription(req, res) {
    try {
        const { productId, number, quantity, address, endDate } = req.body;

        (req.body);
        //order detail = [{productid, quantity}]


        const user = await findOne({ Number: number });

        if (!user) {
            return res.status(200).json({
                message: "No User Found",
                data: null
            })
        }

        const userId = user._id;
        var prodId = Types.ObjectId(productId);

        const adress = await findById(address);

        ("Address id:", adress._id);
        var addressId = Types.ObjectId(adress._id);



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

        ("New Subcription", subscription);

        res.status(200).json({
            message: "Subscription Create Successfully",
            data: subscription
        })

    } catch (error) {

        res.status(400).json({ error: error.message });

    }
}

