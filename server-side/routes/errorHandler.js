import BaseError from "./baseError";

const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send(err.message);
  }
  res.status(500).send("Something had failed in the server.");
};

export default errorHandler;
