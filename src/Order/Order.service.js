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
        if (!order) return { deliveredAt: new Date() }
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

exports.updateOrder = async ({orderId, query})=>{
    try {
        let order = await Order.update({
            ...query
        }, {
            where: {
                id: orderId
            }
        })

        if (order[0] != 1) {
            throw {
                status: 400,
                message: "Error updating order"
            }
        }
    } catch (err) {
        throw err;
    }
}