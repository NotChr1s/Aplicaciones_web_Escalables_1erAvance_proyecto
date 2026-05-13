const { Router } = require('express');
const { getList, addGame, deleteGameinList, updateSpecificFields } = require('../controllers/gamesList.controller');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdminRole = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/:userId", [verifyJWT], getList);

router.post("/", [verifyJWT], addGame);

router.delete("/:gameId", [verifyJWT], deleteGameinList);

router.patch("/:id", [verifyJWT], updateSpecificFields);

module.exports = router;