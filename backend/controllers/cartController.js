import userModel from "../models/userModel.js";

export const addToCart = async (req , res) => {
  try {
    const userId = req.userId;
    const { id: itemId, quantity } = req.body;
    const qtyToAdd = quantity ? Number(quantity) : 1;
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "المستخدم غير موجود" });
    }
    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = qtyToAdd;
    } else {
      cartData[itemId] += qtyToAdd;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "تم الاضافة الى السلة " });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { id: itemId, removeAll } = req.body;
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "المستخدم غير موجود" });
    }
    let cartData = userData.cartData || {};
    if (itemId) {
      if (cartData[itemId]) {
        if (removeAll || cartData[itemId] <= 1) {
          delete cartData[itemId];
        } else {
          cartData[itemId] -= 1;
        }
      }
    } else {
      cartData = {};
    }
    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();
    res.status(200).json({
      success: true,
      message: itemId ? "تم حذف العنصر من السلة" : "تم مسح السلة بنجاح",
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "المستخدم غير موجود" });
    }
    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "المستخدم غير موجود" });
    }
    userData.cartData = {};
    await userData.save();
    res.json({
      success: true,
      message: "تم مسح السلة بنجاح",
      cartData: userData.cartData,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
