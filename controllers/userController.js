const { CallPage } = require("twilio/lib/rest/api/v2010/account/call");
const CartItem = require("../models/cartitem");
const User = require("../models/user");

exports.createuserifnotexist = async (req, res, next) => {
    try {
        const { number } = req.params;

        console.log('yesssssssssssss');
        console.log(number);

        const user = await User.findOne({ Number: number });

        if (!user) {
            const newuser = new User({ Number: number });
            await newuser.save();

            return res.status(200).json({
                message: "Success",
                data: newuser,
            });
        } else {
            return res.status(200).json({
                message: "Success",
                data: user,
            });
        }
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const { phonenumber } = req.body;

        const user = await User.findOne({ Number: number });

        if (!user) {
            res.status(404).send({
                message: "No User Found",
                data: null,
            });
        }

        res.status(200).send({
            message: "Success",
            data: user,
        });
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

exports.addUser = async (req, res, next) => {
    try {
        const { number } = req.query;

        const user = new User({ Number: number });

        await user.save();

        if (!user) {
            res.status(404).send({
                message: "No User Created",
                data: null,
            });
        }

        res.status(200).json({
            message: "Success",
            data: user,
        });
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

exports.createCartItem = async (req, res) => {
    try {

        /* --------------------------------- imports -------------------------------- */
        const { phonenumber, productId, quantity } = req.body;          //userId phone number hoga

        if (!phonenumber || !productId || !quantity) {
            return res.status(404).json({
                message: "Some Queries not passed",
                data: null,
            });
        }

        console.log(phonenumber + '\n' + productId + '\n' + quantity);



        const user = await User.findOne({ Number: phonenumber });
        if (!user) {
            return res.status(404).json({
                message: "NO USER FOUND",
                data: null,
            });
        }
        const userId = user._id;

        if (productId && userId) {
            var cartItem = await CartItem.findOne({ productId, userId });
        }

        if (cartItem) {
            if (quantity != 0) {
                cartItem.ItemCount = parseInt(quantity);
                await cartItem.save();

            } else {
                const cartItemId = cartItem._id;
                await CartItem.deleteOne({ productId, userId })

                for (var i = 0; i < user.CartItem.length; i++) {
                    if (user.CartItem[i].equals(cartItemId)) {
                        user.CartItem.splice(i, 1);
                        await user.save();
                    }
                }
            }

            return res.status(200).json({
                message: "Success",
                data: cartItem,
            });
        } else {

            if (quantity == 0) {
                return res.status(200).json({
                    message: "No Cart Item Exist to delete",
                    data: null
                })
            }
            var cartItem = new CartItem({
                User: userId,
                Item: productId,
                ItemCount: quantity,
            });

            await cartItem.save();

            if (!cartItem) {
                return res.status(404).json({
                    message: "Cart Item not generated",
                    data: null,
                });
            }


            if (!user) {
                return res.status(404).json({
                    message: "No User Found",
                    data: null,
                });
            }
            user.CartItem.push(cartItem._id);
            await user.save();

            return res.status(200).json({
                message: "Success",
                data: cartItem,
            });
        }
    } catch (error) {
        console.log("This is error:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

exports.getAddresses = async (req, res, next) => {
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
