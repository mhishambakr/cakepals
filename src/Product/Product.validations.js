const joi = require('joi');


exports.productListSchema = joi.object({
    skip: joi.number().integer().min(0),
    limit: joi.number().integer().min(0),
    searchQuery: joi.string(),
    category: joi.number().integer(),
    long: joi.number().required(),
    lat: joi.number().required()
})

exports.productCreateSchema = joi.object({
    name: joi.string()
        .min(5)
        .max(15)
        .required(),
    price: joi.number().integer().min(0).required(),
    prepTime: joi.number().integer().min(0).required(),
    CategoryId: joi.number().integer().min(0).required(),
})


exports.productUpdateSchema = joi.object({
    prodId: joi.number().integer().min(0).required(),
    query: joi.object({
        name: joi.string()
            .min(5)
            .max(15),
        price: joi.number().integer().min(0),
        prepTime: joi.number().integer().min(0),
        CategoryId: joi.number().integer().min(0),
    }).required().or('name', 'price', 'prepTime', 'CategoryId')
})

exports.productDeleteRestoreSchema = joi.object({
    id: joi.number().integer().min(0).required(),
})