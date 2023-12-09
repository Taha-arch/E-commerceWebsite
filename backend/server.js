const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT;
const connectDb = require('./config/database.js')
connectDb();

app.use(express.json({limit: '50mb'}));
app.use(cors());
// Use body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

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
const stripe = require("./routes/stripe.js");
app.use("/stripe", stripe)

app.listen(PORT, () => {
    console.log('Server started port: ', PORT);
});
