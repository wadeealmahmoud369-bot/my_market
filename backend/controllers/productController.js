import productModel from "../models/productModel.js";
import fs from "fs";
export const addProduct = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const product = new productModel({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await product.save();
    res.json({ success: true, message: "تمت إضافة المنتاج" });
  } catch (err) {
    console.log(err);
    res.json({ success: true, message: err.message });
  }
};
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
export const removeProducts = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    console.log(req.body);
    fs.unlink(`uploade/${product.image}`, () => {});
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: " حذف المنتج بنجاح" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "خطأ" });
  }
};
