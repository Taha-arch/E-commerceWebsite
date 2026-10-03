const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT;
const connectDb = require('./config/database.js');
connectDb();

app.use(express.json({ limit: '50mb' }));
// Consolidate body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const costumerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRouter = require('./routes/categoryRoutes.js');
const subcategoryRouter = require('./routes/SubcategoryRoutes.js');
const stripe = require('./routes/stripe.js');
const scraperRoutes = require('./routes/scraperRoutes.js');
const settingsRoutes = require('./routes/settingsRoutes.js');

app.use(userRouter);
app.use(productRouter);
app.use(costumerRoutes);
app.use(orderRoutes);
app.use('/categories', categoryRouter);
app.use('/subcategories', subcategoryRouter);
app.use('/stripe', stripe);
app.use('/api/scraper', scraperRoutes);
app.use('/api/settings', settingsRoutes);

app.listen(PORT, () => {
    console.log('Server started port: ', PORT);
});