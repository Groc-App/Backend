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

        const address = user.address;

        if (address.length == 0) {
            res.status(200).send({
                message: "No address found",
                data: null
            })
        }
        res.status(200).send({
            message: "Success",
            data: address
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
        const { number, address } = req.query;

        const user = await User.findOne({ Number: number });

        if (!user) {
            res.status(404).send({
                message: "No User Found",
                data: null
            })
        }

        user.address.push(address);
        await user.save();
        if (address.length == 0) {
            res.status(200).send({
                message: "No address found",
                data: null
            })
        }
        res.status(200).send({
            message: "Success",
            data: address
        })
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}