const express = require("express");

const mongoose = require("mongoose");

const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use("/api", indexRouter);

const mongoURI = `mongodb://localhost:27017/todo`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(5555, () => {
  console.log("server on 5555");
});
