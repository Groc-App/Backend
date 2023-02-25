const User = require("../models/user");

exports.getAddress = async (req, res, next) => {
    try {
        const { number } = req.query;

        const user = await User.findOne({ Number: number });

        if (!user) {
            res.status(404).send({
                message: "No User Found",
                data: null
            })
        }

        const address = user.Address;

        if (address.length == 0) {
            res.status(200).send({
                message: "No address found",
                addresses: address
            })
        }
        res.status(200).send({
            message: "Success",
            addresses: address
        })
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.addAddress = async (req, res, next) => {
    try {
        const { number, address } = req.body;

        console.log(number);


        var user = await User.findOne({ Number: number });

        if (!user) {
            res.status(404).send({
                message: "No User Found",
                data: null
            })
        }

        var addresses = new User(address);
        await addresses.save();


        user.Address.push(addresses._id);
        await user.save();

        if (user.Address.length == 1) {
            addresses.defaultAddress = true;
            addresses.save();

        }
        res.status(200).send({
            message: "Success",
            data: addresses
        })
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}