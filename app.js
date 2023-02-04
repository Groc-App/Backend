const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
// const auth = require("./routes/auth");
const app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });
connectDB();

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
/* ---------------------------  Routes --------------------------- */

const authRouter = require("./routes/user/auth");
const productRouter = require("./routes/products/product.js");
const cartRouter = require("./routes/cart/cartitem");

app.use("/", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

const PORT = process.env.PORT || 8000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);

