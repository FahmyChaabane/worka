import { AuthenticationError } from "apollo-server-express";
import { verify } from "jsonwebtoken";

export default (token) => {
  try {
    return verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    throw new AuthenticationError("Your token is unvalid");
  }
};
