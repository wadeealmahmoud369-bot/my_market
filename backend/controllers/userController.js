import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "المستخدم لا يملك حساب" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "كلمة المرور خاطئة" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "البيانات المدخلة خاطئة " });
  }
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "هذا الأيميل مستخدم ولديه حساب",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "يرجى كتابة البريد بشكل صحيح",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "كلمة المرور يجب أن تكون أكثر من 8 أحرف",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    // return all user fields except password so frontend receives `role`, `name`, `email`, etc.
    const users = await userModel.find().select("-password");
    res.json({ success: true, data: users });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "error" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(500)
        .json({ success: false, message: "المستخدم غير موجود" });
    }
    res.json({ success: true, message: "user deleted " });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};
export const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const UpdatedUser = await userModel.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true },
    );
    if (!UpdatedUser) {
      (res.status(404), json({ success: false, message: "user not found" }));
    }
    res.json({ success: true, message: "تم الترقية الى ادمن" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "خطأ في السيرفر" });
  }
};
export const demoteToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "User is not an admin" });
    }
    user.role = "user";
    await user.save();
    res.json({
      success: true,
      message: "تم إعادة المستخدم إلى مستخدم عادي بنجاح",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "خطأ في السيرفر" });
  }
};
