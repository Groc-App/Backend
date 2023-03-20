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

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Groc App',
            version: "1.0.0"
        },
        servers: [{
            url: 'htpp://localhost:8000/'
        }]
    },
    apis: [
        './app.js',
        './routes/category/category.js'
    ]
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

dotenv.config({ path: "./config/config.env" });

connectDB();

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json())
// app.use(cors({
//     origin: '*',
// }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
/* ---------------------------  Routes --------------------------- */

const authRouter = require("./routes/user/auth");
const productRouter = require("./routes/products/product.js");
const categoryRouter = require('./routes/category/category')
const cartRouter = require("./routes/cart/cartitem");
const orderRouter = require("./routes/orders/orders");
const offerRouter = require("./routes/offer/offer");
const subscriptionRouter = require("./routes/subscription/subscription");

app.use("/", authRouter);
app.use("/address", require('./routes/address/address'));
app.use("/user", require('./routes/user/user'));
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use('/category', categoryRouter)
app.use('/offer', offerRouter)
app.use('/subscription', subscriptionRouter)
const PORT = process.env.PORT || 8000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);

