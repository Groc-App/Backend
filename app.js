import express, { urlencoded, json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db";
// const auth = require("./routes/auth");
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

config({ path: "./config/config.env" });

connectDB();

app.use(cookieParser());

app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(json());

// if (process.env.NODE_ENV === "development") {
//     app.use(morgan("dev"));
// }
/* ---------------------------  Routes --------------------------- */

import authRouter from "./routes/user/auth";
import productRouter from "./routes/products/product.js";
import categoryRouter from './routes/category/category';
import cartRouter from "./routes/cart/cartitem";
import orderRouter from "./routes/orders/orders";
import offerRouter from "./routes/offer/offer";
import quoteRouter from "./routes/quote/quote";
import subscriptionRouter from "./routes/subscription/subscription";

app.use("/", authRouter);
app.use("/address", require('./routes/address/address'));
app.use("/user", require('./routes/user/user'));
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use('/category', categoryRouter)
app.use('/offer', offerRouter)
app.use('/quote', quoteRouter)
app.use('/subscription', subscriptionRouter)
const PORT = process.env.PORT || 8000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);

