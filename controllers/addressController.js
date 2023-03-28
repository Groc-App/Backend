import Address, { findById, findByIdAndDelete, findOne, findByIdAndUpdate, find } from "../models/address.js";
import { findOne as _findOne } from "../models/user.js";

export async function addAddress(req, res, next) {
  try {
    const { number, address } = req.body;

    ("inside add address " + number);

    var user = await _findOne({ Number: number });

    if (!user) {
      res.status(404).send({
        message: "No User Found",
        data: null,
      });
    }

    var newaddress = new Address(address);
    newaddress.UserId = user._id;
    await newaddress.save();

    user.Address.push(newaddress._id);
    await user.save();

    if (user.Address.length == 1) {
      newaddress.defaultAddress = true;
      newaddress.save();
    }
    res.status(200).send({
      message: "Success",
      data: newaddress,
    });
  } catch (error) {
    console.log("This is error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteAddress(req, res, next) {
  try {
    const { number, addressid } = req.body;

    ("inside delete address " + number);

    var user = await _findOne({ Number: number });

    if (!user) {
      return res.status(404).send({
        message: "No User Found",
        data: null,
      });
    }

    var idx = -1;
    for (var i = 0; i < user.Address.length; i++) {
      if (user.Address[i] == addressid) {
        idx = i;
        break;
      }
    }
    if (idx == -1) {
      return res
        .status(400)
        .json({ message: "Address not present in User model" });
    }
    user.Address.splice(idx, 1);
    await user.save();

    var addtodel = findById(addressid);

    if (addtodel.defaultAddress == false)
      await findByIdAndDelete(addressid);
    else {
      await findByIdAndDelete(addressid);
      var defadd = await findOne({ UserId: user._id });

      if (defadd != null) {
        defadd.defaultAddress = true;
        await defadd.save();
      }
    }

    return res.status(200).send({
      message: " delete Success",
    });
  } catch (error) {
    console.log("This is error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateAddress(req, res, next) {
  try {
    const { addressinfo, addressId } = req.body;

    ("inside update address " + addressId);

    await findByIdAndUpdate(addressId, {
      Flat_FLoor_Tower: addressinfo["Flat_FLoor_Tower"],
      Recipients_Name: addressinfo["Recipients_Name"],
      Street_Society: addressinfo["Street_Society"],
      City: addressinfo["City"],
      Pincode: addressinfo["Pincode"],
    });

    return res.status(200).send({
      message: " update Success",
    });
  } catch (error) {
    console.log("This is error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function setSelectedAddress(req, res, next) {
  try {
    const { number, addressid } = req.body;

    ("inside set address " + addressid);

    var user = await _findOne({ Number: number });

    var addresses = await find({ UserId: user._id });
    for (var i = 0; i < addresses.length; i++) {
      var data = addresses[i];
      if (data._id == addressid) {
        data.defaultAddress = true;
        await data.save();
      } else {
        data.defaultAddress = false;
        await data.save();
      }
    }

    return res.status(200).send({
      message: " updated selected address Success",
    });
  } catch (error) {
    console.log("This is error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
}
