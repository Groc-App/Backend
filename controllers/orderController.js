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

    console.log(userid)
    const data = await User.findOne({ Number: userid }).populate({
      path: "Order",
      populate: {
        path: "OrderDetails.Product",
        model: "Order",
      },
    })

    if (!data) {
      return res.status(200).json({
        message: "No Data Found"
      })
    }

    res.status(200).json({
      message: "Success",
      data
    })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// ordere id generate krvani h

exports.createOrder = async (req, res) => {
  try {
    const { tamount, userid, orderdetail, cartItemsId } = req.body;

    console.log(req.body);
    //order detail = [{productid, quantity}]

    const usar = await User.findOne({ Number: userid });



    const neworder = new Order({
      TotalAmount: tamount,
      OrderStatus: "Ordered",
      Date: Date.now(),
      OrderDetails: orderdetail,
      User: usar._id,
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

    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

