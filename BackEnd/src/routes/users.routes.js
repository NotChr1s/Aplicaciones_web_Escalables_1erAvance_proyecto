const { Router } = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/users.controller');
const router = Router();

router.get("/", getUsers);

router.post("/", createUser);

router.put("/", updateUser);

router.delete("/", deleteUser);

module.exports = router;