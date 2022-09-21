import httpStatusCodes from "./httpStatusCodes";
import BaseError from "./baseError";

class Api400Error extends BaseError {
  constructor(
    description,
    name = "Bad request.",
    statusCode = httpStatusCodes.BAD_REQUEST
  ) {
    super(description, name, statusCode);
  }
}

export default Api400Error;
