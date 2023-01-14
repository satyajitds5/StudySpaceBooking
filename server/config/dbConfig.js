const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);

// To Check if connection is succesful
const db = mongoose.connection;

// To check if connection is succesful
db.on('connected', () => {
    console.log('Mongo DB Connection succesfully established');
});

// If connection Error occurs
db.on('error', () => {
    console.log("Mongo DB Connection failed");
});