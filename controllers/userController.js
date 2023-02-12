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
        const { phonenumber, productId, quantity } = req.body;          //userId phone number hoga
        var prevQuantity;

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
                prevQuantity = cartItem.ItemCount;
                cartItem.ItemCount = prevQuantity + quantity;
                await cartItem.save();
                return res.status(200).json({
                    message: "Success",
                    data: cartItem,
                });
            } else {
                await CartItem.deleteOne({ productId, userId })
            }
        } else {
            var cartItem = new CartItem({
                User: userId,
                Item: productId,
                ItemCount: quantity,
            });

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
            user.CartItem.push(user.id);
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
