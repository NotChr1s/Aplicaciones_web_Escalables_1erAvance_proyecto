const { response, request } = require('express');
const GameList = require('../models/gameList.model');

const getList = async (req = request, res = response) => {

    const { userId } = req.params;

    try {
        const games = await GameList.find({ userId: userId });
        res.status(200).json(games)
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving games'
      });
    }
};

const addGame = async (req = request, res = response) => {

    const { id, userId, gameId, name, image, score, status } = req.body;
    console.log(id, userId, gameId, name, image, score, status);

    if(!id || !userId || !gameId || !name || !image || score === undefined || !status){
        res.status(400).json({ 
            message: 'data is required' 
            
        })
        return;
    }

    try{
        const newGame = new GameList({
            id,
            userId,
            gameId,
            name,
            image,
            score,
            status
        });
        await newGame.save();
        res.status(201).json({
            message: 'Game added successfully',
            game: newGame
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error adding game'
        });
    }
};

const updateGameinList = async (req = request, res = response) => {

    const { id, userId, gameId, name, image, score, status } = req.body;
    console.log(id, userId, gameId, name, image, score, status);

    if(!id || !userId || !gameId || !name || !image || score === undefined || !status){
        res.status(400).json({ 
            message: 'data is required' 
            
        })
        return;
    }

    try{
        const updatedGame = await GameList.findOneAndUpdate(
            { id },
            { userId, gameId, name, image, score, status },
            { new: true }
        );
        if (!updatedGame) {
            return res.status(404).json({
                message: 'Game not found'
            });
        }
        res.status(200).json({
            message: 'Game updated successfully',
            game: updatedGame
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error updating game'
        });
    }
};

const deleteGameinList = async (req = request, res = response) => {
    const { gameId } = req.params;

    if(!gameId){
        res.status(400).json({
            message: 'Game ID is required'
        })
        return;
    }

    try{
        const deletedGame = await GameList.findOneAndDelete({ gameId: gameId });
        if (!deletedGame) {
            return res.status(404).json({
                message: 'Game not found'
            });
        }
        res.status(200).json({
            message: 'Game deleted successfully',
            game: deletedGame
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error deleting game'
        });
    }
};

module.exports = {
    getList,
    addGame,
    updateGameinList,
    deleteGameinList
};