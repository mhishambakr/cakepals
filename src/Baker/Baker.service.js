const { Op, Sequelize } = require("sequelize");
const { Baker, User, Order, Product } = require("..");
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
            },{
                model: Product,
                attributes: ['name', 'price']
            }],
            raw: true,
            nest: true
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

exports.calculateBakerRating = async ({BakerId})=>{
    try {
        let orders = await Order.findAll({
            where: {
                status: 'finished'
            },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']],
            include: [{
                model: Product,
                where: {
                    BakerId
                },
            }],
            order: [['createdAt', 'DESC']],
            raw: true,
            nest: true
        })
        return orders[0]?.avgRating
    } catch (err) {
        throw err;
    }
}



exports.updateBaker = async ({ id, query }) => {
    try {
        let baker = await Baker.update({
            ...query

        }, {
            where: {
                id
            }
        })

        return baker
    } catch (err) {
        throw err;
    }
}

exports.incrementAvailablity = async ({ BakerId, prepTime }) => {
    try {
        let availableIn = await Baker.increment('availableIn', { by: prepTime, where: { id: BakerId } });
        
        return availableIn;
    } catch (err) {
        throw err;
    }
}