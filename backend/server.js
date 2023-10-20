const express = require('express');
const mongoose = require('mongoose');
const costumerRoutes = require('./routes/customerRoutes');
const app = express();
const dotenv = require('dotenv').config() ;
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((err) => {
    console.error('Connection to MongoDB failed:', err);
    });

    app.use(express.json());
    app.use(costumerRoutes);
    

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})