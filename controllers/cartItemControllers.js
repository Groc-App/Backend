const { error } = require("console");
const CartItem = require("../models/cartitem");
const User = require("../models/user");
const { findByIdAndDelete, findByIdAndUpdate } = require("../models/category");
const Category = require("../models/category");
const Product = require("../models/product");

exports.addCartItem = async (req, res) => {
  try {
    const { userid, productid, itemcount } = req.body;

    const newitem = new CartItem({
      User: userid,
      ItemCount: itemcount,
      Item: productid,
    });
    await newitem.save();
    return res.status(201).json({ success: "Added Successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await CartItem.findByIdAndDelete(id);

    if (!data) res.status(400).json({ error: error.message });
    return res.status(200).json({ success: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { id, quantity } = req.body; // cart item ki id h ye na ki userid

    const data = await CartItem.findByIdAndUpdate(id, { ItemCount: quantity });

    if (!data) res.status(400).json({ error: error.message });
    return res.status(200).json({ success: "Updated Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCartItembynumber = async (req, res) => {
  try {
    const { phonenumber, productId } = req.body;

    (phonenumber, productId);

    // var item = await CartItem.findOneAndRemove({Item: productid});
    var user = await User.findOne({ Number: phonenumber });

    if (!user) return res.status(400).json({ "message": "error in finding user" });

    const userId = user._id;

    if (productId && userId) {
      var cartItem = await CartItem.findOne({ Item: productId, User: userId });

      if (!cartItem) return res.status(400).json({ "message": "error in finding cartitem" });
    }

    const cartItemId = cartItem._id;
    await CartItem.findByIdAndDelete(cartItemId);

    for (var i = 0; i < user.products.length; i++) {
      if (user.products[i].equals(cartItemId)) {
        user.products.splice(i, 1);
        await user.save();
      }
    }

    return res.status(200).json({
      message: "Success Removed"
    })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};