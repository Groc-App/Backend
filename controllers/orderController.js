import CartItem from "../models/cartitem.js"
import Address from "../models/address.js"
import Order from "../models/orders.js"
import uniqid from 'uniqid';
import Offer from '../models/offers.js'
import User from '../models/user.js'



export const fetchallOrdersbyUserId = async (req, res) => {
  try {
    const { userid } = req.params;

    const usar = await User.findOne({ Number: userid });

    if (!usar) {
      return res.status(200).json({
        message: "No User Found",
        data: null
      })
    }

    const data = await Order.find({ User: usar._id }).populate("OrderDetails.Product").populate("Addres");

    if (!data) {
      return res.status(200).json({
        message: "No Data Found",
      });
    }

    return res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
};

// ordere id generate krvani h


export const verifyReferral = async (req, res) => {
  try {

    const { number } = req.body;


    const user = await User.findOne({ Number: number });
    if (!user) {
      return res.status(200).json({
        message: "No User Found",
        data: null
      })
    }

    if (user.refferedBy != null && user.refferedBy && user.Order.length == 0) {
      return res.status(200).json({
        message: "true",
      });
    } else {
      return res.status(200).json({
        message: "false",
      });
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const createOrder = async (req, res) => {
  try {
    const { tamount, userid, orderdetail, addressid, offerId } = req.body; // address map string bhej rha hu to ek baar check kr liyo krunyi ab ref use kr liya


    const usar = await User.findOne({ Number: userid });

    if (!usar) {
      return res.status(200).json({
        message: "No User Found",
        data: null
      })
    }


    /* --------------------------- With Referral COde first Time --------------------------- */
    if (usar.refferedBy != null && usar.Order.length == 0) {

      const masterUser = await User.findById(usar.refferedBy);

      if (!masterUser) {
        return res.status(400).json({ message: "Wrong Referral Code" });
      }

      masterUser.referralOffer.referredPeople = masterUser.referralOffer.referredPeople + 1;

      await masterUser.save();
      usar.refferedBy = null;
      await usar.save();

    }
    /* -------------------------------------------------------------------------- */

    const adress = await Address.findById(addressid);

    if (!adress) {
      return res.status(400).json({ error: "num address found" });
    }

    var uniqId = uniqid.time('ORD-');

    const neworder = new Order({
      OrderId: uniqId,
      TotalAmount: tamount,
      OrderStatus: "Ordered",
      Date: Date.now(),
      OrderDetails: orderdetail,
      User: usar._id,
      Addres: adress._id,
    });


    /* --------------------------- Redeeming If Offer --------------------------- */


    if (offerId != '') {

      if (offerId == 'REF10') {
        usar.referralOffer.isClaimed = usar.referralOffer.isClaimed + 1;
        await usar.save();
      }
      else {

        var offer = await Offer.findById(offerId);

        offer.redeemedUsers.push(usar._id);

        await offer.save();
      }
    }


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
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const fetchallAllOrdersbyStatus = async (req, res) => {
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

export const updateorderstatus = async (req, res) => {
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
