const { Router } = require('express');
const { getList, addGame, updateGameinList, deleteGameinList } = require('../controllers/gamesList.controller');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdminRole = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/:userId", [verifyJWT], getList);

router.post("/", [verifyJWT], addGame);

router.put("/", [verifyJWT], updateGameinList);

router.delete("/:gameId", [verifyJWT], deleteGameinList);


module.exports = router;