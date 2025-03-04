const mongoose = require('mongoose');
const {User} = require('../models/User');


// establishing connection with database
const uri = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
        }).then(() =>{
            console.log('Connected to MongoDB successfully!');
        }).catch(error =>{
            console.error('Error while connecting to MongoDB: ' + error.message);
        })
        
    } catch (error) {
        console.error('Error while connecting to MongoDB: ' + error.message);
    }
};


// const User = mongoose.model("User", userSchema);

module.exports = connectDB;
