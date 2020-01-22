const query = require('../../query');
const invoke = require('../../invoke');
const productValidator = require('../../app/validations/productValidator');

/* List Products */
exports.listProducts = async (req, res) => {
    try {
        const products = await query.listProducts();
        return res.send({ data: products });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

/* Add Product */
exports.storeProduct = async (req, res) => {
    try {
        const { error } = productValidator.validateStoreProduct(req.body);
        if (error) { return res.status(422).send(error); }

        const result = await invoke.storeProduct(req.body);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

/* Buy Product */
exports.buyProduct = async (req, res) => {
    try {
        const { error } = productValidator.validateBuyProduct(req.body);
        if (error) { return res.status(422).send(error); }

        const result = await invoke.buyProduct(req.body);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

/* Review Product */
exports.reviewProduct = async (req, res) => {
    try {
        const { error } = productValidator.validateReviewProduct(req.body);
        if (error) { return res.status(422).send(error); }

        const result = await invoke.reviewProduct(req.body);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
