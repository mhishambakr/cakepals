const { createOrder, getLatestBakerOrder, estimateDelivery } = require("./Order.service");
const { getProductDetails } = require("../Product/Product.service");

exports.makeOrder = async (req, res) => {
    try {
        let { ProductId, paymentMethod } = req.body

        let { id: MemberId } = res.locals.user.Member;

        let { prepTime, BakerId } = await getProductDetails({ query: { id: ProductId } });

        let { deliveredAt: availableIn } = await getLatestBakerOrder({ BakerId })

        let deliveredAt = estimateDelivery({ prepTime, availableIn })

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