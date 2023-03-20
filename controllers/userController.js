const { CallPage } = require("twilio/lib/rest/api/v2010/account/call");
const Address = require("../models/address");
const CartItem = require("../models/cartitem");
const User = require("../models/user");

exports.createuserifnotexist = async (req, res, next) => {
  try {
    const { number, refferalcode } = req.body;
    console.log("refferal code is ::: " + refferalcode);

    console.log("yesssssssssssss");
    console.log(number);

    if (refferalcode == null) {
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
          message: "Already Registered",
          data: user,
        });
      }
    }
    else
    {

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

exports.updateCartItem = async (req, res) => {
  try {
    /* --------------------------------- imports -------------------------------- */
    const { phonenumber, productId, quantity } = req.body; //userId phone number hoga

    if (!phonenumber || !productId || !quantity) {
      return res.status(404).json({
        message: "Some Queries not passed",
        data: null,
      });
    }

    console.log(phonenumber + "\n" + productId + "\n" + quantity);

    const user = await User.findOne({ Number: phonenumber });
    if (!user) {
      return res.status(404).json({
        message: "NO USER FOUND",
        data: null,
      });
    }
    const userId = user._id;

    if (productId && userId) {
      var cartItem = await CartItem.findOne({ Item: productId, User: userId });
    }

    if (cartItem) {
      if (quantity != 0) {
        cartItem.ItemCount = parseInt(quantity);
        await cartItem.save();
      }

      return res.status(200).json({
        message: "Success",
        data: cartItem,
      });
    } else {
      if (quantity == 0) {
        return res.status(200).json({
          message: "No Cart Item Exist to delete",
          data: null,
        });
      }

      console.log("UserId:", userId);
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
      console.log("Before:", user);
      user.products.push(cartItem._id);
      await user.save();
      console.log("After:", user);

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

exports.createCartItem = async (req, res) => {
  try {
    /* --------------------------------- imports -------------------------------- */
    const { phonenumber, productId } = req.body; //userId phone number hoga

    if (!phonenumber || !productId) {
      return res.status(404).json({
        message: "Some Queries not passed",
        data: null,
      });
    }

    console.log(phonenumber + "\n" + productId + "\n");

    const user = await User.findOne({ Number: phonenumber });
    if (!user) {
      return res.status(404).json({
        message: "NO USER FOUND",
        data: null,
      });
    }
    const userId = user._id;

    console.log("UserId:", userId);
    var cartItem = new CartItem({
      User: userId,
      Item: productId,
      ItemCount: 1,
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
    console.log("Before:", user);
    user.products.push(cartItem._id);
    await user.save();
    console.log("After:", user);

    return res.status(200).json({
      message: "Success",
      data: cartItem,
    });
  } catch (error) {
    console.log("This is error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAddresses = async (req, res, next) => {
  try {
    const { phonenumber } = req.body;

    console.log(phonenumber + " yhi hhhhhhhhhhhhh");

    const user = await User.findOne({ Number: phonenumber }).populate(
      "Address"
    );

    if (!user) {
      return res.status(404).send({
        message: "No User Found",
        data: null,
      });
    }

    const address = user.Address;

    if (address.length == 0) {
      return res.status(200).send({
        message: "No address found",
        addresses: address,
      });
    }
    return res.status(200).send({
      message: "Success",
      addresses: address,
    });
  } catch (error) {
    console.log("This is error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSelectedAddress = async (req, res, next) => {
  try {
    const { id } = req.params; //id phonenumber h ye

    console.log(id);

    const user = await User.findOne({ Number: id }).populate("Address");

    if (!user) {
      return res.status(404).send({
        message: "No User Found",
        data: null,
      });
    }

    for (var i = 0; i < user.Address.length; i++) {
      const address = user.Address[i];
      if (address.defaultAddress == true) {
        return res.status(200).send({
          message: "Success",
          data: address,
        });
      }
    }

    return res.status(200).send({
      message: "No Default Address Found",
      data: null,
    });
  } catch (error) {
    console.log("This is error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.FetchallItemsbyUserId = async (req, res) => {
  try {
    const { id } = req.params; // user id

    const data = await User.findOne({ Number: id }).populate({
      path: "products",
      populate: {
        path: "Item",
        model: "Product",
      },
    });
    // .exec(function (err, data) {
    //   if (err) return res.status(400).json({ error: err.message });
    //   res.status(200).json({
    //     message: "Success",
    //     data,
    //   });
    // });

    if (!data) return res.status(404).json({ message: "No items" });

    return res
      .status(200)
      .json({ message: "Feteched Items Successfully", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
