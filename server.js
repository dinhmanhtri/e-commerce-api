const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const createError = require("http-errors");
require("./src/configs/db.config");

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res, next) => {
  res.json({ message: "This is Home page" });
});

app.use((req, res, next) => {
  next(createError(404, "Not Found!"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
