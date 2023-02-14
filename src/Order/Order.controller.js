const { createOrder } = require("./Order.service");
const moment = require('moment');

exports.makeOrder = async (req, res) => {
    try {
        let { ProductId, paymentMethod } = req.body

        let { id: MemberId } = res.locals.user.Member;

        let deliveredAt = moment(new Date()).add(20, 'm').toDate().toISOString().slice(0, 19).replace('T', ' ');

        let data = await createOrder({ ProductId, paymentMethod, MemberId, deliveredAt })

        res.status(200).json({
            message: 'Order created successfully.',
            data: {
                ...data
            }
        })
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}