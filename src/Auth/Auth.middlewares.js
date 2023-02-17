const jwt = require('jsonwebtoken');
const { secret } = require('../../config/auth.config');
const { findUser } = require('../User/User.service');
const { registerSchema, loginSchema } = require('./Auth.validations');
const { roles } = require('./Auth.roles');

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
            message: error.message || 'Unauthorized',
        })
    }
}

exports.checkRole = async (req, res, next) => {
    try {
        if (!roles[req.originalUrl.split('?')[0]].includes(res.locals.user.role)) {
            throw {
                status: 401,
                message: 'Your account is not authorized to do this action'
            }
        }

        next();
    } catch (err) {
        res.status(401).json({
            message: err.message
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
