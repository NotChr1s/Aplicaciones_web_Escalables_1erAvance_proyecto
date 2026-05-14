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

const updateSpecificFields = async (req = request, res = response) => {
    try {
        const { id } = req.params; 
        const fieldsToUpdate = req.body;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        const updatedUserGame = await GameList.findOneAndUpdate(
            { id: id }, 
            { $set: fieldsToUpdate }, // el $set solo aplica cambios a las llaves presentes en fieldsToUpdate
            { 
                new: true, // Devuelve el documento ya modificado
                runValidators: true // Asegura que el status siga siendo uno de los permitidos
            }
        );

        if (!updatedUserGame) {
            return res.status(404).json({ message: "game not found" });
        }

        res.json({
            message: "field(s) updated successfully",
            game: updatedUserGame
        });

    } catch (error) {
        console.error('patch error:', error);
        res.status(500).json({ message: "Error updating field(s)", error: error.message });
    }
}

module.exports = {
    getList,
    addGame,
    deleteGameinList,
    updateSpecificFields
};