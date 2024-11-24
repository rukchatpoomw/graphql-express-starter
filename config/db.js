const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const db = `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`
        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;
