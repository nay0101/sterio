require("dotenv").config();
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
// const path = require("path");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1/sterio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();
const port = process.env.PORT || "4000";
const httpServer = http.createServer(app);

const loginRouter = require("./routes/loginRouter");
const adminLoginRouter = require("./routes/adminLoginRouter");
const filmsRouter = require("./routes/filmsRouter");
const userRouter = require("./routes/userRouter");
const subscriptionRouter = require("./routes/subscriptionRouter");
const stripeRouter = require("./routes/stripe");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Login
app.use("/api/auth", loginRouter);
app.use("/api/admin", adminLoginRouter);

//Film Control
app.use("/api/film", filmsRouter);

//User Control
app.use("/api/users", userRouter);

//Subscriptions
app.use("/api/subscription", subscriptionRouter);

//Payment
app.use("/api/payment", stripeRouter);

app.use("/api/public", express.static(path.join(__dirname, "public")));

httpServer.listen(port);
module.exports = app;
