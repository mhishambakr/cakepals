

const joi = require('joi');

exports.orderCreateSchema = joi.object({
    paymentMethod: joi.string().valid('cash on delivery', 'credit card').required(),
    ProductId: joi.number().integer().min(0).required(),
})


exports.orderUpdateSchema = joi.object({
    orderId: joi.number().integer().min(0).required(),
    query: joi.object({
        status: joi.string().valid('accepted','rejected', 'finished'),
        rating: joi.number().integer().valid(0,1,2,3,4,5),
    }).required().xor('status', 'rating')
})