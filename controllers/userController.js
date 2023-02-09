const User = require("../models/user");

exports.getUser = async (req, res, next) => {
    try {
        const { number } = req.query;

        const user = await User.findOne({ Number: number });

        if (!user) {
            res.status(404).send({
                message: "No User Found",
                data: null
            })
        }

        res.status(200).send({
            message: "Success",
            data: user
        })
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const { number } = req.query;

        const user = new User({ Number: number });

        await user.save();

        if (!user) {
            res.status(404).send({
                message: "No User Created",
                data: null
            })
        }

        res.status(200).send({
            message: "Success",
            data: user
        })
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}