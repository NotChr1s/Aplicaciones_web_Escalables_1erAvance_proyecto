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
        message: 'server error',
      });
    }
};

const createGame = async (req, res) => {
    try {
        //generar el siguiente ID
        const lastGame = await Game.findOne().sort({ id: -1 });
        let nextId = "G0001";
        // Si hay un juego existente, incrementamos el ID
        if (lastGame) {
            // Extraemos la parte numerica del ID, incrementamos y formateamos de nuevo
            const numericPart = parseInt(lastGame.id.substring(1));
            nextId = `G${(numericPart + 1).toString().padStart(4, '0')}`;
        }

        const { title, duration, genres, developers, editors, platforms, description, ignScore, imageUrl } = req.body;

        const newGame = new Game({
            id: nextId,
            title,
            duration,
            genres, 
            developers,
            editors,
            platforms, 
            description,
            ignScore,
            imageUrl 
        });

        await newGame.save();
        res.status(201).json({ message: "game created", game: newGame });

    } catch (error) {
        res.status(500).json({ message: "Error:", error: error.message });
    }
}

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