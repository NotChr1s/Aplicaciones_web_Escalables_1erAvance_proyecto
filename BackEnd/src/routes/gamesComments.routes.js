const { Router } = require('express');
const { getGameComments, createGameComment } = require('../controllers/gamesComments.controller');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdminRole = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/:gameId",  getGameComments);

router.post("/", [verifyJWT], createGameComment);

module.exports = router;