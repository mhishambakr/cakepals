const jwt = require('jsonwebtoken');
const { secret } = require('../../config/auth.config');
const { findUser } = require('../User/User.service');
const { registerSchema, loginSchema } = require('./Auth.validations');


exports.authMiddleware = async (req, res, next) => {
    try {
        let token = req?.headers?.authorization?.split(' ')[1];

        if (!token) {
            throw {
                status: 401,
                message: 'Unauthorized. Please login first'
            }
        }

        let decoded = await jwt.verify(token, secret)

        let { user } = await findUser({ query: { id: decoded.id } });

        res.locals.user = user;

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}

exports.validateRegisteration = async (req, res, next) => {
    try {
        await registerSchema.validateAsync(req.body)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}


exports.validateLogin = async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}
