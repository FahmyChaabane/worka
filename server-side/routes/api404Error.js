import httpStatusCodes from "./httpStatusCodes";
import BaseError from "./baseError";

class Api404Error extends BaseError {
  constructor(
    description,
    name = "Not found.",
    statusCode = httpStatusCodes.NOT_FOUND
  ) {
    super(description, name, statusCode);
  }
}

export default Api404Error;
