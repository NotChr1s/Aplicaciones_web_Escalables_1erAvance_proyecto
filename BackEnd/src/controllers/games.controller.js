const { response, request } = require('express');
const Game = require('../models/game.model');

const getGames = async (req = request, res = response) => {

    const { q } = req.query;

    try {
        const games = await Game.find({ title: RegExp(q)});
        res.status(200).json(games)
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error en el servidor'
      });
    }
};

const createGame = (req = request, res = response) => {

    const { name, genre } = req.body;

    if(!name  || !genre){
        res.status(400).json({ 
            message: 'data is required' 
        })
        return;
    }

    res.status(200).json({ 
        message: 'Post  games', 
        name,
        genre
    });
};

const updateGame = (req = request, res = response) => {
    res.status(200).json({ 
        message: 'Put  games' 
    });
};

const deleteGame = (req = request, res = response) => {
    res.status(200).json({ 
        message: 'Delete  games' 
    });
};  

module.exports = {
    getGames,
    createGame,
    updateGame,
    deleteGame
};