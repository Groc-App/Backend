const { CallPage } = require("twilio/lib/rest/api/v2010/account/call");
const Address = require("../models/address");
const CartItem = require("../models/cartitem");
const User = require("../models/user");
const mongoose = require('mongoose')

const { use } = require("../routes/user/user").default;

exports.createuserifnotexist = async (req, res, next) => {
  try {
    const { number, refferalcode } = req.body;
    ("refferal code is ::: " + refferalcode);

    ("yesssssssssssss");
    (number);

    const user = await User.findOne({ Number: number });

    if (user != null) {
      return res.status(200).json({
        message: "AlreadyRegistered",
        data: user,
      });
    } else {
      const newuser = new User({ Number: number });

      await newuser.save();

      newuser.referralCode = newuser._id;

      if (refferalcode != '') {

        if (!mongoose.Types.ObjectId.isValid(refferalcode)) {
          return res.status(200).json({
            message: "WrongCode",
            data: null
          })
        }

        const masterUser = await User.findById(refferalcode);

        if (!masterUser) {
          return res.status(200).json({ message: "WrongCode" });
        }

        newuser.refferedBy = refferalcode;
      }

      await newuser.save();

      return res.status(200).json({
        message: "Success",
        data: newuser,
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
    const { number, offerCode } = req.query;

    const foundUser = await User.findOne({ Number: number });

    if (foundUser) {
      return res.status(404).send({
        message: "User Already Created",
        data: foundUser,
      });
    }

    const user = new User({ Number: number });

    /* ----------------------------- Encrypting Text ---------------------------- */

    var algorithm = "aes256"; // or any other algorithm supported by OpenSSL
    var key = "password";
    var text = phonenumber;

    var cipher = crypto.createCipher(algorithm, key);

    var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");

    user.referralCode = encrypted;

    await user.save();

    /* -------------------------------------------------------------------------- */

    if (!user) {
      return res.status(404).json({
        message: "No User Created",
        data: null,
      });
    }

    if (offerCode) {
      if (user.Order.length != 0) {
        return res.status(200).json({
          message: "Not eligible for Offer",
          data: null,
        });
      }

      user.refferedBy = offerCode;

      await user.save();
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

    (phonenumber + "\n" + productId + "\n" + quantity);

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

      ("UserId:", userId);
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
      ("Before:", user);
      user.products.push(cartItem._id);
      await user.save();
      ("After:", user);

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
    ("Create car");
    /* --------------------------------- imports -------------------------------- */
    const { phonenumber, productId } = req.body; //userId phone number hoga

    if (!phonenumber || !productId) {
      return res.status(404).json({
        message: "Some Queries not passed",
        data: null,
      });
    }

    (phonenumber + "\n" + productId + "\n");

    const user = await User.findOne({ Number: phonenumber });
    if (!user) {
      return res.status(404).json({
        message: "NO USER FOUND",
        data: null,
      });
    }
    const userId = user._id;

    ("UserId:", userId);
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
    ("Before:", user);
    user.products.push(cartItem._id);
    await user.save();
    ("After:", user);

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

    (phonenumber + " yhi hhhhhhhhhhhhh");

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
    ("This is error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSelectedAddress = async (req, res, next) => {
  try {
    const { id } = req.params; //id phonenumber h ye

    (id);

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
