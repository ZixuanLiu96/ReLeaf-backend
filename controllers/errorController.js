const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}, please use another value!`;
  // console.log('1111111', err.keyValue.name);
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    return el.message;
  });
  console.log(errors);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired, please log in again!", 401);

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  // Operational, trusted error: send message to the client

  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });

    // Programming or other unknown error: don't leak error details to the client
  } else {
    // 1) log error
    console.log("ERROR 💥", error);

    // 2) send generic message
    res.status(500).json({
      status: "error",
      message: "something wrong!",
    });
  }
};

module.exports = (error, req, res, next) => {
  // console.log(error.stack);

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    // ... is shallow copy, ca't copy some important properties, such as name, message...
    // so we should add those properties manually

    // console.log({ ...error });   // the result is confusing, can't trust
    let err = {
      ...error,
      name: error.name,
      message: error.message,
      stack: error.stack,
    };

    if (err.name === "CastError") {
      err = handleCastErrorDB(err);
    }
    // handle duplicate data in create function : using the code
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);

    // handle mongoose validation errors
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    sendErrorProd(err, res);

    // handle jwt errors
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();
  }
};
