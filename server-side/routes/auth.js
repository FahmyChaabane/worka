import { User } from "../models/user";
import bcrypt from "bcryptjs";
import express from "express";
import asyncMiddleware from "./asyncMiddleware";
import Api400Error from "./api400Error";
const router = express.Router();

// login
router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Api400Error("Email or Password invalid.");

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) throw new Api400Error("Email or Password invalid.");

    const token = await user.generateJWT();
    res.send(token);
  })
);

export default router;
