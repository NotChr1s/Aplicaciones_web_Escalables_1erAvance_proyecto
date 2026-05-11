const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req = request, res = response) => {

    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({
            message: 'Missing username or password'
        });
    }

    try {
        const user = await User.findOne({ name: name})
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        jwt.sign({
            id: user.id,
            name: user.name,
            role: user.role,
            profilePicture: user.profilePicture,
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
                token
            });
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Error occurred while logging in'
        });
    }
}

const register = async (req = request, res = response) => {

    const { id, name, role, email, password, profilePicture, birth } = req.body;

    if (!id || !name || !role || !email || !password || !profilePicture || !birth) {
        return res.status(400).json({
            message: 'Missing required fields'
        });
    }

    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            id,
            name,
            email,
            role: 'user',
            password: hashedPassword,
            profilePicture: 'profile.jpg',
            birth
        });
        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error occurred while registering'
        });
    }
}

module.exports = {
    login,
    register
}