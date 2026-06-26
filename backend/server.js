import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/image", express.static("uploads"));
app.use("/api/users", userRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API WORKING");
});
await connectDB();
app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}.....`);
});
