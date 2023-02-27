const Offer = require('../models/offers');
const User = require('../models/user');




exports.postOffers = async (req, res) => {
    try {
        const { number, description, name } = req.body;

        var offer = new Offer(req.body);

        await offer.save();

        res.status(200).send({
            message: "Success",
            data: offer
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
exports.updateOffer = async (req, res) => {
    try {
        const { number, offerId } = req.body;

        const user = await User.findOne({ number });

        var offer = await Offer.findById(offerId);

        offer.claimedUsers.push(user._id);
        await offer.save();

        res.status(200).send({
            message: "Success",
            data: offer
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
exports.getAllOffers = async (req, res) => {
    try {

        const { number } = req.query;

        var isUserClaimed = false;

        const user = await User.findOne({ number });

        var customizedoffer = {};
        var resultedArray = [];

        if (!user) {
            return res.status(200).send({
                message: "No user Found",
                data: null
            })
        }

        var offers = await Offer.find();

        if (!offers) {
            return res.status(200).send({
                message: "No Offers Found",
                data: null
            })
        }
        /* ------ looping through the array to add claimed flag to offer object ----- */

        for (var i = 0; i < offers.length; i++) {
            isUserClaimed = false;
            const offer = offers[i];
            if (offer.claimedUsers.forEach((userid) => {
                console.log(user._id + ":" + userid);
                if (user._id.equals(userid)) {
                    console.log("inside if log");
                    isUserClaimed = true;
                }
            }));

            customizedoffer = {
                name: offer.name,
                description: offer.description,
                isUserClaimed: isUserClaimed,
                number: offer.number,
                worth: offer.worth,
                offerId: offer._id.toString()

            }

            resultedArray.push(customizedoffer);

        }
        console.log(resultedArray);

        res.status(200).send({
            message: "Success",
            data: resultedArray
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
