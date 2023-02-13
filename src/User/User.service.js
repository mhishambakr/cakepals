const { User } = require("..");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");


exports.findUserByUsername = async ({username})=>{
    try {
        let user = await User.findOne({
            where: {
                username
            },
            raw: true
        });

        if (!user) {
            throw {
                status: 404,
                message: 'This username doesn\'t exist',
            }
        }

        return { user };
    } catch (err) {
        throw err;
    }
}

exports.findUser = async ({query})=>{
    try {
        let user = await User.findOne({
            where: {
                ...query
            },
            raw: true
        });

        if (!user) {
            throw {
                status: 404,
                message: 'User not found',
            }
        }

        return { user };
    } catch (err) {
        throw err;
    }
}

exports.createUser = async ({ username, userPass, email }) => {
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