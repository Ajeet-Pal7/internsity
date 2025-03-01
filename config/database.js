const mongoose = require('mongoose');
const {User} = require('../models/User');


// establishing connection with database
const uri = 'mongodb://127.0.0.1:27017/internsity';
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
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