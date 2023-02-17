const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { User } = require('..');
const { Op } = require('sequelize');
const { secret } = require('../../config/auth.config');




exports.validatePassword = async ({ password, actualPassword }) => {
    try {
        var isValidPassword = bcrypt.compareSync(password, actualPassword);

        if (!isValidPassword) {
            throw {
                status: 401,
                message: 'wrong password',
            }
        };

        return true;
    } catch (err) {
        throw err;
    }
}

exports.login = async ({userId})=>{
    try {
        var token = jwt.sign({ id: userId }, secret, {
            expiresIn: 86400
        });
    
        return { token };
    } catch (error) {
        throw {
            status: 401,
            message: 'Error logging in'
        }
    }
}