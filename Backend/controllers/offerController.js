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

        const user = await User.findOne({ Number: number });

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
exports.redeemOffer = async (req, res) => {
    try {
        const { number, offerId } = req.body;

        const user = await User.findOne({ Number: number });

        var offer = await Offer.findById(offerId);

        if (!offer) {
            return res.status(200).json({
                message: "Invalid",
                data: null
            })
        }

        var foundFlag = false;

        offer.redeemedUsers.forEach((userid) => {

            if (user._id.equals(userid)) {
                console.log("inside if log");
                foundFlag = true;
            }

        })

        if (foundFlag) {
            return res.status(200).json({
                message: "Redeemed",
                data: null
            })
        }

        res.status(200).json({
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
        console.log("this is number", number);

        var isUserClaimed = false;
        var isUserRedeemed = false;

        const user = await User.findOne({ Number: number });
        const totalUserOrder = user.Order.length;
        console.log("This is user", user);

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
            isUserRedeemed = false;
            const offer = offers[i];

            /* ----------------------------- For Claim Check ---------------------------- */
            if (offer.claimedUsers.forEach((userid) => {
                console.log(user._id + ":" + userid);
                if (user._id.equals(userid)) {
                    console.log("inside if log");
                    isUserClaimed = true;
                }
            }));

            /* ----------------------------- For RedeemCheck ---------------------------- */
            if (offer.redeemedUsers.forEach((userid) => {
                console.log(user._id + ":" + userid);
                if (user._id.equals(userid)) {
                    console.log("inside if log");
                    isUserRedeemed = true;
                }
            }));

            customizedoffer = {
                name: offer.name,
                description: offer.description,
                isUserClaimed: isUserClaimed,

                isUserRedeemed: isUserRedeemed,
                number: offer.number,
                worth: offer.worth,
                offerId: offer._id.toString(),
                totalUserOrder: totalUserOrder

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

// exports.redeemreferral = async (req, res) => {
//     try {
//         const { number, offerCode } = req.body;

//         if (offerCode) {

//         }

//         /* ------------------------- Decrytinhg Coupon Code ------------------------- */


//         /* --------------------------- Finding Master User -------------------------- */

//         const masterUser = await User.findById(offerCode)

//         if (!masterUser) {
//             return res.status(200).json({
//                 message: "Invalid",
//                 data: null
//             })
//         }

//         /* ------------ Finding if user has already availed Master Coupon ----------- */
//         var foundFlag = false;

//         masterUser.referralOffer.forEach((ref) => {
//             if (ref.refferralNumber == number) {
//                 foundFlag = true;
//                 return res.status(200).json({
//                     message: "You Have Used Referral Code",
//                     data: null
//                 })

//             }
//         });

//         masterUser.push({
//             refferralNumber: number,
//             isClaimed: false
//         });

//         var offer = await Offer.findById(offerId);

//         if (!offer) {
//             return res.status(200).json({
//                 message: "Invalid",
//                 data: null
//             })
//         }

//         res.status(200).json({
//             message: "Success",

//         })


//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         })
//     }
// }
