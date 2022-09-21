class BaseError extends Error {
  constructor(description, name, statusCode) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
