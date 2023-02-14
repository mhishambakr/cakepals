const { Order } = require("..");


exports.createOrder = async ({ paymentMethod, ProductId, MemberId, deliveredAt }) => {
    try {
        console.log({
            status: 'pending',
            paymentMethod,
            ProductId,
            MemberId,
            deliveredAt,
            rating: 0
        });
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