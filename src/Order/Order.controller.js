const { createOrder, getLatestBakerOrder, estimateDelivery, updateOrder, getOrderDetails } = require("./Order.service");
const { getProductDetails } = require("../Product/Product.service");
const { updateBaker, incrementAvailablity, decrementAvailablity } = require("../Baker/Baker.service");

exports.makeOrder = async (req, res) => {
    try {
        let { ProductId, paymentMethod } = req.body

        let { id: MemberId } = res.locals.user.Member;

        let { prepTime, BakerId } = await getProductDetails({ query: { id: ProductId } });

        let { deliveredAt: availableIn } = await getLatestBakerOrder({ BakerId })

        let deliveredAt = estimateDelivery({ prepTime, availableIn })

        let data = await createOrder({ ProductId, paymentMethod, MemberId, deliveredAt })

        await incrementAvailablity({ BakerId, prepTime })

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

exports.updateOrder = async (req, res) => {
    try {
        let { orderId, query } = req.body;

        let data = await updateOrder({ orderId, query });

        if (query.status == 'finished') {
            let order = await getOrderDetails({orderId});

            await decrementAvailablity({BakerId: order?.Product?.Baker?.id, prepTime: order?.Product?.prepTime})
        }

        res.status(200).json({
            message: 'Order updated successfully.',
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