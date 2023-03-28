
import express, { urlencoded, json } from "express";
import { config } from "dotenv";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";


config({ path: "./config/config.env" });

connectDB();

app.use(cookieParser());

app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
/* ---------------------------  Routes --------------------------- */

// import authRouter from "./routes/user/auth.js";
import productRouter from "./routes/products/product.js";
import categoryRouter from './routes/category/category.js';
import cartRouter from "./routes/cart/cartitem.js";
import orderRouter from "./routes/orders/orders.js";
import offerRouter from "./routes/offer/offer.js";
import quoteRouter from "./routes/quote/quote.js";
import subscriptionRouter from "./routes/subscription/subscription.js";
import addressRouter from './routes/address/address.js';
import userRouter from './routes/user/user.js';

app.use("/address", addressRouter);
app.use("/user", userRouter);
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

