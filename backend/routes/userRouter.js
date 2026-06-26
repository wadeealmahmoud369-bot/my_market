import express from "express";
import { deleteUser, demoteToUser, getAllUsers, loginUser, makeAdmin, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/list", getAllUsers);
userRouter.delete("/delete/:id", deleteUser);
userRouter.put("/demote/:id", demoteToUser);
userRouter.put("/make-admin/:id", makeAdmin);

export default userRouter;
