
const mongoose = require("mongoose");

// MONGOOSE SETUP 
const connectDb = () => {

    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('connected to database');
        
    }).catch((error) =>{console.log`${error} did not connect)`});
}

module.exports = connectDb;