const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const updateUser = async (req = request, res = response) => {
    
    const { id } = req.params;
    const { password, ...restData } = req.body;
    
    try {
        //volver a hashear la contraseña si se está actualizando
        if (password && password.length > 0) {
            restData.password = await bcrypt.hash(password, 10)
        }

        //actualizar el usuario y retornar el nuevo actualizado
        const userUpdated = await User.findOneAndUpdate({ id: id }, restData, { new: true });

        if (!userUpdated) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        jwt.sign({
            id: userUpdated.id,
            name: userUpdated.name,
            role: userUpdated.role,
        }, process.env.SECRET_KEY, 
        { expiresIn: '4h' }, (error, token)=>{
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Error occurred while generating token'
                });
            }
        
            res.status(200).json({ 
                message: 'Login successful',
                token,
                user: userUpdated 
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
};

const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const userDeleted = await User.findOneAndDelete({ id: id });

        if (!userDeleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'User deleted successfully',
            id_deleted: id
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
};  

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};