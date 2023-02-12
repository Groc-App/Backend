const CartItem = require("../models/cartitem");
const User = require("../models/user");

exports.createuserifnotexist = async (req, res, next) => {
  try {
    const { number } = req.query;

    const user = await User.findOne({ Number: number });

    if (!user) {
      const newuser = new User({ Number: number });
      await newuser.save();

      res.status(200).json({
        message: "Success",
        data: user,
      });
    } else {
      res.status(200).json({
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
    const { userId, productId, quantity } = req.body;
    var prevQuantity;

    if (!userId || !productId || quantity) {
      return res.status(404).json({
        message: "Some Queries not passed",
        data: null,
      });
    }

    if (productId && userId) {
      var cartItem = await CartItem.findOne({ productId, userId });
    }

    if (cartItem) {
      prevQuantity = cartItem.ItemCount;
      cartItem.ItemCount = prevQuantity + quantity;
      await cartItem.save();
      return res.status(200).json({
        message: "Success",
        data: cartItem,
      });
    } else {
      var cartItem = new CartItem({
        User: userId,
        Item: Item,
        ItemCount: quantity,
      });

      if (!cartItem) {
        return res.status(404).json({
          message: "Cart Item not generated",
          data: null,
        });
      }

      var user = await User.findById(userId);

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
