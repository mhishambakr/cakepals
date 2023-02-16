const joi = require('joi');

exports.bakerDetailsSchema = joi.object({
    id: joi.number().integer().min(0).required(),
})