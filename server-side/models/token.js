import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800, // 7 days
  },
});

tokenSchema.pre("save", async function (next) {
  const tokenModelObj = this;
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_WORK_FACTOR));
  tokenModelObj.token = await bcrypt.hash(tokenModelObj.id, salt);
  tokenModelObj.password = await bcrypt.hash(tokenModelObj.password, salt);
  next();
});

export const Token = mongoose.model("Token", tokenSchema);
