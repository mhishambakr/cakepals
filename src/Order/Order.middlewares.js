const { orderCreateSchema, orderUpdateSchema } = require("./Order.validations");


exports.validateOrderCreate = async (req, res, next) => {
    try {
        await orderCreateSchema.validateAsync(req.body)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}



exports.validateOrderUpdate = async (req, res, next) => {
    try {
        await orderUpdateSchema.validateAsync(req.body)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}