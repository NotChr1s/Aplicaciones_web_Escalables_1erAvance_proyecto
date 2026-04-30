const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
    res.status(200).json({ 
        message: 'Get  users' 
    });
};

const createUser = (req = request, res = response) => {
    res.status(200).json({ 
        message: 'Post  users' 
    });
};

const updateUser = (req = request, res = response) => {
    res.status(200).json({ 
        message: 'Put  users' 
    });
};

const deleteUser = (req = request, res = response) => {
    res.status(200).json({ 
        message: 'Delete  users' 
    });
};  

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};