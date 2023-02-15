const { Op } = require("sequelize");
const { Order, Product } = require("..");
const moment = require('moment');

exports.getLatestBakerOrder = async ({ BakerId }) => {
    try {
        console.log('here');
        let order = await Order.findOne({
            where: {
                [Op.or]: [{ status: 'accepted' }, { status: 'pending' }],
                deliveredAt: {
                    [Op.gt]: moment(new Date).toDate()
                }
            },
            include: [{
                model: Product,
                where: {
                    BakerId
                }
            }],
            order: [['createdAt', 'DESC']],
            raw: true,
            nest: true
        })
        console.log(order)
        return order
    } catch (err) {
        throw err;
    }
}

exports.estimateDelivery = ({ availableIn, prepTime }) => {
    try {
        return moment(new Date(availableIn)).add(prepTime, 'm').toDate();
    } catch (err) {
        throw err;
    }
}

exports.createOrder = async ({ paymentMethod, ProductId, MemberId, deliveredAt }) => {
    try {
        let order = await Order.create({
            status: 'pending',
            paymentMethod,
            ProductId,
            MemberId,
            deliveredAt,
            rating: 0
        })

        return order;
    } catch (err) {
        console.log(err)
        throw err;
    }
}