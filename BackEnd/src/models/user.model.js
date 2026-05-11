const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        default: 'Anonymous'
    },
    role: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'profile.jpg'
    },
    birth: {
        type: String,
    },
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);