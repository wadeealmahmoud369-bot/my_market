import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const frontend_url = "https://my-market-frontend-96vm.onrender.com";
  try {
    const userId = req.body.userId || req.userId;
    const newOrder = new orderModel({
      userId: userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    if (userId){
      /* افراغ السلة */
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
    }
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "دفع" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "لم يدفع" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export const userOrder = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    console.log(userId);
    const order = await orderModel.find({ userId: req.body.userId||req.userId });
    res.json({ success: true, data: order });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "تحديث الحالة" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "حطأ" });
  }
};
