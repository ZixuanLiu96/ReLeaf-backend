const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const app = require("./index");

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((con) => {
    console.log("DB connection successful!");
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.json({ message: "Hello from Node backend!" });
});

const port = process.env.PORT || 5005;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
