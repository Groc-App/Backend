const { error } = require("console");
const CartItem = require("../models/cartitem");
const User = require("../models/user");
const { findByIdAndDelete, findByIdAndUpdate } = require("../models/category");
const Category = require("../models/category");
const Product = require("../models/product");
const Order = require("../models/orders");
const Address = require("../models/address");
var uniqid = require('uniqid');


exports.fetchallOrdersbyUserId = async (req, res) => {
  try {
    const { userid } = req.params;

    console.log(userid);
    const data = await User.findOne({ Number: userid }).populate({
      path: "Order",
      populate: [
        {
          path: "OrderDetails.Product",
          model: "Product",
        },
        {
          path: "Addres",
          model: "Address",
        },
      ],
    });

    if (!data) {
      return res.status(200).json({
        message: "No Data Found",
      });
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
};

// ordere id generate krvani h

exports.createOrder = async (req, res) => {
  try {
    const { tamount, userid, orderdetail, addressid } = req.body; // address map string bhej rha hu to ek baar check kr liyo krunyi ab ref use kr liya

    console.log(req.body);

    const usar = await User.findOne({ Number: userid });
    const adress = await Address.findById(addressid);

    if (!adress) {
      return res.status(400).json({ error: "num address found" });
    }

    var uniqId = uniqid.time('ORD-');
    console.log("UNiqe ID::::", uniqId);

    const neworder = new Order({
      OrderId: uniqId,
      TotalAmount: tamount,
      OrderStatus: "Ordered",
      Date: Date.now(),
      OrderDetails: orderdetail,
      User: usar._id,
      Addres: adress._id,
    });

    console.log("New Order", neworder);

    await neworder.save();

    usar.Order.push(neworder._id);

    const usarId = usar._id;

    await CartItem.deleteMany({ User: usarId });

    usar.products = [];
    await usar.save();

    res.status(200).json({
      message: "Order Create Successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.fetchallAllOrdersbyStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const data = await Order.find({ OrderStatus: status }).populate("OrderDetails.Product").populate("Addres");

    if (!data) {
      return res.status(200).json({
        message: "No Data Found",
        data: data,
      });
    }

    return res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.updateorderstatus = async (req, res) => {
  try {
    const { orderid, status } = req.body;
    console.log(status);

    const order = await Order.findById(orderid);

    if (!order) {
      return res.status(300).json({
        message: "No order found in database",
      });
    }

    order.OrderStatus = status;
    await order.save();

    return res.status(200).json({
      message: "Successfully updated status",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
