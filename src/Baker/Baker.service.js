const { Op } = require("sequelize");
const { Baker, User } = require("..");
const bcrypt = require('bcryptjs')
exports.getBaker = async ({ query }) => {
    try {
        let baker = await Baker.findOne({
            where: {
                ...query
            },
            attributes: ['rating'],
            include: [{
                model: User,
                attributes: ['name']
            }],
            raw: true
        });
        baker = { name: baker['User.name'], ...baker }
        delete baker['User.name'];


        if (!baker) {
            throw {
                status: 404,
                message: 'Profile not found'
            }
        }

        return baker
    } catch (err) {
        throw err;
    }
}


exports.createBaker = async ({ name, username, email, userPass, long, lat }) => {
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
                email,
                name,
                Baker: {
                    long,
                    lat,
                }
            },
            include: [Baker],
            raw: true
        });

        if (!created) {
            throw {
                status: 409,
                message: 'Baker with this username or email already exists',
            }
        }
        user = user.get({ plain: true })

        return { user }
    } catch (error) {
        console.log(error)
        throw error;
    }
}


exports.updateBaker = async ({ id, query }) => {
    try {
        let product = await Product.update({
            ...query

        }, {
            where: {
                id
            }
        })

        return product
    } catch (err) {
        throw err;
    }
}
