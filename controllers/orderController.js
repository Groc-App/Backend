const { error } = require("console");
const CartItem = require("../models/cartitem");
const User = require("../models/user");
const { findByIdAndDelete, findByIdAndUpdate } = require("../models/category");
const Category = require("../models/category");
const Product = require("../models/product");
const Order = require("../models/orders");

exports.fetchallOrdersbyUserId = async (req, res) => {
  try {
    const { userid } = req.params;

    User.findById(userid)
      .populate({
        path: "Order",
        populate: {
          path: "OrderDetails.Product",
          model: "Order",
        },
      })
      .exec(function (err, data) {
        if (err) res.status(400).json({ error: error.message });
        res.send(data);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// ordere id generate krvani h

exports.createOrder = async (req, res) => {
  try {
    const { tamount, userid, orderdetail } = req.body; //order detail = [{productid, quantity}]

    const neworder = new Order({
      TotalAmount: tamount,
      OrderStatus: "Ordered",
      Date: Date.now(),
      OrderDetails: orderdetail,
      User: userid,
    });
    await neworder.save();

    const usar = await User.findById(userid);
    usar.Order.push(neworder._id);
    await usar.save();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
