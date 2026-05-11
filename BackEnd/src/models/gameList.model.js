const mongoose = require('mongoose');

const gameListSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    gameId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { collection: 'gamesList' });

module.exports = mongoose.model('GameList', gameListSchema);