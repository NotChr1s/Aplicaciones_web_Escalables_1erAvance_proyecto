const mongoose = require('mongoose');

const gameCommentSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { collection: 'gamesComments' });

module.exports = mongoose.model('GameComment', gameCommentSchema);