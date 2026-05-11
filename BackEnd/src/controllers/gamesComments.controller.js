const { response, request } = require('express');
const GameComment = require('../models/gameComment');

const getGameComments = async (req = request, res = response) => {

    const { gameId } = req.params;

    try {
        const comments = await GameComment.find({ gameId: gameId });
        res.status(200).json(comments);
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving game comments'
      });
    }
};

const createGameComment = async (req = request, res = response) => {

    const { gameId, username, avatar, date, text } = req.body;
    console.log(gameId, username, avatar, date, text);

    if(!gameId || !username || !avatar || !date || !text){
        res.status(400).json({ 
            message: 'data is required' 
        })
        return;
    }

    try{
        const newComment = new GameComment({
            gameId,
            username,
            avatar,
            date,
            text
        });
        await newComment.save();
        res.status(201).json({
            comment: newComment
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error adding comment'
        });
    }
};

module.exports = {
    getGameComments,
    createGameComment
};