const express = require('express');
const mongoose = require('mongoose');


const app = express();
const dotenv = require('dotenv').config() ;
const PORT = process.env.PORT;
const connectDb = require('./config/database.js')
connectDb();




const costumerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');


    app.use(express.json());
    app.use(costumerRoutes);
    app.use(orderRoutes);



mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((err) => {
    console.error('Connection to MongoDB failed:', err);
    });


    
    

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})