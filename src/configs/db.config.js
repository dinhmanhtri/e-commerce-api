const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URL;

mongoose
  .connect(DB_URL, { serverSelectionTimeoutMS: 3000 })
  .then((result) => console.log("Database connection Success!"))
  .catch((err) => console.log("Database connection failed!", err));

mongoose.connection.on("connected", () => {
  console.log("Mongodb connected to db!");
});

mongoose.connection.on("error", (err) => {
  console.error(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb connected is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
