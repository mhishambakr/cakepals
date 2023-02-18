const { User, Baker, Member } = require("..");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

exports.findUser = async ({ query }) => {
    try {
        let user = await User.findOne({
            where: {
                ...query
            },
            include: [{
                model: Member,
                required: false
            }, {
                model: Baker,
                required: false
            }],
            raw: true,
            nest: true
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

exports.createUser = async ({ name, username, email, password, role, coordinates }) => {
    try {

        let hashedPassword = bcrypt.hashSync(password, 8);

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
                email,
                name,
                role,
                Baker: role === 'baker' && {
                    ...coordinates
                },
                Member: role === 'member' && {
                    
                }
            },
            include: [role === 'baker' ? Baker: Member],
            raw: true
        });

        if (!created) {
            throw {
                status: 409,
                message: 'User with this username or email already exists',
            }
        }
        user = user.get({ plain: true })

        return { user }
    } catch (error) {
        console.log(error)
        throw error;
    }
}