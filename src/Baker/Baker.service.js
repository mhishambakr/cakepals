const { Op } = require("sequelize");
const { Baker, User } = require("..");

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
        baker = {name: baker['User.name'], ...baker}
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


exports.createBaker = async ({ userId: UserId, long, lat }) => {
    try {

        let [baker, created] = await Baker.findOrCreate({
            where: {
                [Op.or]: [
                    { UserId }
                ]
            },
            defaults: {
                UserId,
                long,
                lat,
            },
        });

        if (!created) {
            throw {
                status: 409,
                message: 'member with this username or email already exists',
            }
        }
        baker = baker.get({ plain: true })

        return { baker }
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
