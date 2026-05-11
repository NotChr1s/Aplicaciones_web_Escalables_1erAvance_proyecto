const { Router } = require('express');
const { createGame, getGames, updateGame, deleteGame } = require('../controllers/games.controller');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdminRole = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/",  getGames);

router.post("/", [verifyJWT, verifyAdminRole], createGame);

router.put("/", [verifyJWT, verifyAdminRole], updateGame);

router.delete("/", [verifyJWT, verifyAdminRole], deleteGame);


module.exports = router;