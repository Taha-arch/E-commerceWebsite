const express = require('express');
const mongoose = require("mongoose");

const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const connectDb = require('./config/database.js')
connectDb();

app.use(express.json());
app.use(costumerRoutes);

const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
app.use(userRouter);
app.use(productRouter);

const categoryRouter = require('./routes/categoryRoutes.js');
app.use('/categories', categoryRouter)

const subcategoryRouter = require('./routes/SubcategoryRoutes.js');
app.use('/subcategories', subcategoryRouter);

app.listen(PORT, () => {
    console.log('Server started port: ', PORT);
});

