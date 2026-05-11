const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        default: 'Untitled Game'
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    ignScore: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    genres: {
        type: [String],
    },
    developers: {
        type: String
    },
    editors: {
        type: String
    },
    platforms: {
        type: [String],
    },
    description: {
        type: String,
    },
}, { collection: 'games' });

module.exports = mongoose.model('Game', gameSchema);