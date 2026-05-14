const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyJWT = async ( req = request, res = response, next) => {

    const authHeader = req.header('Authorization');

    console.log('Verifying JWT...');
    if (!authHeader) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    const token = authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : authHeader;

    try {
        const {id} = jwt.verify(token, process.env.SECRET_KEY);
        console.log(id);
        const user = await User.findOne({ id: id });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        req.activeUserRole = user.role;
        next();
    } catch (error) {
        console.log('Error verifying JWT:', error);
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}

module.exports = verifyJWT;