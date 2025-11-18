const express = require("express");
const morgan = require("morgan");
const plantRouter = require("./routes/plantRoute");
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const adoptionRouter = require("./routes/adoptionRoute");
const cors = require("cors");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(
  cors({ origin: ["http://localhost:5173", "https://releaf123.netlify.app"] })
);

app.use("/api/plants", plantRouter);
app.use("/api/users", userRouter);
app.use("/api/adoptions", adoptionRouter);

app.all(/.*/, (req, res, next) => {
  // const err = new Error(`Cant't find ${req.originalUrl} on this server!`);
  // console.log(err);
  // err.status = "fail";
  // err.statusCode = 404;
  next(new AppError(`Cant't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
