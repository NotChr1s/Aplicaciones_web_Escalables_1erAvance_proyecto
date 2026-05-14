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

const createGame = async (req, res) => {
    try {
        // El ID automático (G0001...) 
        const lastGame = await Game.findOne().sort({ id: -1 });
        let nextId = "G0001";
        if (lastGame) {
            const numericPart = parseInt(lastGame.id.substring(1));
            nextId = `G${(numericPart + 1).toString().padStart(4, '0')}`;
        }

        // Aquí desestructuras req.body directamente, sin JSON.parse
        const { title, duration, genres, developers, editors, platforms, description, ignScore, imageUrl } = req.body;

        const newGame = new Game({
            id: nextId,
            title,
            duration,
            genres, // Ya viene como array del TS
            developers,
            editors,
            platforms, // Ya viene como array del TS
            description,
            ignScore,
            imageUrl // Aquí se guarda el Base64 directamente en MongoDB
        });

        await newGame.save();
        res.status(201).json({ message: "Juego creado", game: newGame });

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