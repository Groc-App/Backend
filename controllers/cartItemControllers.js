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

exports.FetchallItemsbyUserId = async (req, res) => {
  try {
    const { id } = req.params; // user id

    const data = await User.findById(id).populate({
      path: "CartItems", populate: {
        path: "Item", model: "Product"
      }
    }).exec(function (err, data) {
      if (err) return res.status(400).json({ error: error.message });
      return res.status(200).send({
        message: "Success",
        data: data
      })
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
