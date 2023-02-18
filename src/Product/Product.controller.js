const { Op, Sequelize } = require("sequelize");
const { createProduct, updateProduct, getProducts, deleteProduct, resotreProduct, getProductDetails } = require("./Product.service");

exports.addProduct = async (req, res) => {
    try {
        let { name, price, prepTime, CategoryId } = req.body;
        let { id: BakerId } = res.locals.user.Baker;

        let { product } = await createProduct({ name, price, prepTime, BakerId, CategoryId });

        res.status(200).json({
            message: 'Product added successfully',
            data: {
                product
            }
        })
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let { prodId, query } = req.body;

        let { id: BakerId } = res.locals.user.Baker;

        await updateProduct({ prodId, BakerId, query })

        res.status(200).json({
            message: 'Product updated successfuly',
            data: {

            }
        })

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.getProductList = async (req, res) => {
    try {
        let { limit, skip, searchQuery, category, long, lat } = req.query;

        let query = {
            [Op.or]: [
                { name: { [Op.like]: `%${searchQuery || ''}%` } },
            ]
        };

        if (category) query['CategoryId'] = Number(category)

        let products = await getProducts({ query, limit, skip, long, lat })

        res.status(200).json({
            message: 'Product list fetched successfully.',
            data: {
                products
            }
        })
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.removeProduct = async (req,res)=>{
    try {
        let { id } = req.query;

        let { id: BakerId } = res.locals.user.Baker;

        await deleteProduct({ id, BakerId })

        res.status(200).json({
            message: 'Product removed successfuly',
            data: {

            }
        })

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.restoreProduct = async (req,res)=>{
    try {
        let { id } = req.query;

        let { id: BakerId } = res.locals.user.Baker;

        await resotreProduct({ id, BakerId })

        res.status(200).json({
            message: 'Product restored successfuly',
            data: {

            }
        })

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}
