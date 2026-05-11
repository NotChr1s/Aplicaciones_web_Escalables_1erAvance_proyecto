const mongoose = require('mongoose');

const connectDB =  () => {
    const connstring = process.env.MONGO_STRING;
    const dbname = process.env.DB_NAME;

    mongoose.connect(connstring, {
        dbName: dbname,
    }).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
}

module.exports = connectDB;
