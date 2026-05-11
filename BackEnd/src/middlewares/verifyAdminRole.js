const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyAdminRole = async ( req = request, res = response, next) => {

    console.log(req.acriveUserRole);

    if (!req.activeUserRole) {
        return res.status(401).json({
            message: 'Access denied.'
        });
    }

    if (req.activeUserRole !== 'admin') {
        return res.status(401).json({
            message: 'Access denied. Admin role required.'
        });
    }

    next();
}

module.exports = verifyAdminRole;