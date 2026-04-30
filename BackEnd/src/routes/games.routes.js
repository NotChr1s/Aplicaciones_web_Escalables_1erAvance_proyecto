const { Router } = require('express');
const { createGame, getGames, updateGame, deleteGame } = require('../controllers/games.controller');
const router = Router();

router.get("/", getGames);

router.post("/", createGame);

router.put("/", updateGame);

router.delete("/", deleteGame);


module.exports = router;