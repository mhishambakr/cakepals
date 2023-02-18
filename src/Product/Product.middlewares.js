const { productListSchema, productCreateSchema, productUpdateSchema, productDeleteRestoreSchema } = require("./Product.validations");


exports.validateProductList = async (req, res, next) => {
    try {
        await productListSchema.validateAsync(req.query)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}


exports.validateProductCreate = async (req, res, next) => {
    try {
        await productCreateSchema.validateAsync(req.body)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}



exports.validateProductUpdate = async (req, res, next) => {
    try {
        await productUpdateSchema.validateAsync(req.body)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}

exports.validateProductDeletionAndRestoration = async (req, res, next) => {
    try {
        await productDeleteRestoreSchema.validateAsync(req.query)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}
