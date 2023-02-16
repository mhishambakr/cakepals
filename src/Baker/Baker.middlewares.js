const { bakerDetailsSchema } = require("./Baker.validations");

exports.validateBakerDetails = async (req, res, next) => {
    try {
        await bakerDetailsSchema.validateAsync(req.query)

        next();
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || 'Something went wrong',
        })
    }
}
