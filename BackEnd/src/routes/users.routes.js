const { Router } = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/users.controller');
const router = Router();
const verifyJWT = require('../middlewares/verifyJWT');

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", [verifyJWT], updateUser);

router.delete("/:id", [verifyJWT], deleteUser);

module.exports = router;