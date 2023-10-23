const express = require('express');
const mongoose = require("mongoose");

const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const connectDb = require('./config/database.js')
connectDb();

app.use(express.json());


const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
app.use(userRouter);
app.use(productRouter);

app.listen(PORT, () => {
    console.log('Server started port: ', PORT);
});

