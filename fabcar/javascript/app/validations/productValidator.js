const Joi = require('@hapi/joi');

exports.validateStoreProduct = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        color: Joi.string().required(),
        make: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        image: Joi.string().required(),
        type: Joi.string().required()
    });

    return schema.validate(data);
};

exports.validateBuyProduct = (data) => {
    const schema = Joi.object({
        product_id: Joi.string().required(),
        user_id: Joi.string().required(),
    });

    return schema.validate(data);
};

exports.validateReviewProduct = (data) => {
    const schema = Joi.object({
        product_id: Joi.string().required(),
        user_id: Joi.string().required(),
        description: Joi.string().required(),
        token: Joi.string().required(),
    });

    return schema.validate(data);
};
