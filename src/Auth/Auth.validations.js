const joi = require('joi');


exports.registerSchema = joi.object({
    name: joi.string()
        .min(5)
        .max(25)
        .required(),

    email: joi.string().email(),

    username: joi.string()
        .alphanum()
        .min(5)
        .max(15)
        .required(),

    password: joi.string().min(8).required(),

    role: joi.string().valid('member', 'baker').required(),

    coordinates: joi.object().when('role',{
        is: 'baker',
        then: joi.object({
            long: joi.number().required(),
            lat: joi.number().required()
        }).required(),
        otherwise: joi.object().forbidden()
    })
})

exports.loginSchema = joi.object({
    username: joi.required(),
    password: joi.required(),
})