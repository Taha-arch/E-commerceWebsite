const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const connectDb = require('./config/database.js')
connectDb();

app.use(express.json());
app.use(cors());

const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
app.use(userRouter);
app.use(productRouter);

const costumerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
    app.use(costumerRoutes);
    app.use(orderRoutes);

const categoryRouter = require('./routes/categoryRoutes.js');
app.use('/categories', categoryRouter)

const subcategoryRouter = require('./routes/SubcategoryRoutes.js');
app.use('/subcategories', subcategoryRouter);

app.listen(PORT, () => {
    console.log('Server started port: ', PORT);
});

