require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const orderRoutes = require("./Routers/order.route");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Connected to order-service");
});
connectDB();
app.use("/", orderRoutes);

module.exports = app;
