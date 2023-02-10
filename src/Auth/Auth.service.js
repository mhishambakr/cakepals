const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { User } = require('..');
const { Op } = require('sequelize');
const { secret } = require('../../config/auth.config');


exports.register = async ({ username, password: userPass, email }) => {
    try {

        let hashedPassword = bcrypt.hashSync(userPass, 8);

        let [user, created] = await User.findOrCreate({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            },
            defaults: {
                username,
                password: hashedPassword,
                email
            },
        });

        if (!created) {
            throw {
                status: 409,
                message: 'member with this username or email already exists',
            }
        }
        user = user.get({ plain: true })
        delete user.password
        return { user }
    } catch (error) {
        console.log(error)
        throw error;
    }
}

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
        console.log(secret)
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