const { response, request } = require('express');
const User = require('../models/user.model');

const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.find();
        res.status(200).json({ 
            message: 'Get users',
            users
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        });
    }
};

const createUser = async (req = request, res = response) => {
    const { id, name, email, password, profilePicture, birth } = req.body;

    if (!id || !name || !email || !password || !profilePicture || !birth) {
        return res.status(400).json({
            message: 'Missing required fields'
        });
    }

    try{
        const newUser = new User({
            id,
            name,
            email,
            password,
            profilePicture,
            birth
        })
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
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