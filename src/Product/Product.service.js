const { Op, Sequelize } = require("sequelize");
const { Product, Baker, User } = require("..");

exports.getProductDetails = async ({ query }) => {
    try {
        let product = await Product.findOne({
            where: {
                ...query
            },
            include: [Baker],
            raw: true,
            nest: true
        });


        if (!product) {
            throw {
                status: 404,
                message: 'Profile not found'
            }
        }

        return product
    } catch (err) {
        throw err;
    }
}

exports.getProducts = async ({ query, limit, skip, long, lat }) => {
    try {
        let products = await Product.findAndCountAll({
            where: {
                ...query
            },
            limit: Number(limit) || 10,
            offset: Number(skip) || 0,
            attributes: ["id", "name", "price", "prepTime"],
            include: [{
                model: Baker,
                attributes: ['id', [Sequelize.literal("3959 * acos(cos(radians(" + lat + ")) * cos(radians(lat)) * cos(radians(`long`) - radians(" + long + ")) + sin(radians(" + lat + ")) * sin(radians(lat)))"), 'distance'], 'availableIn'],
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            }],
            raw: true,
            nest: true
        })

        products.rows = products.rows.filter((prod) => prod.Baker.distance < 5).map(prod=>{
            return{
                ...prod,
                Baker: {
                    ...prod.Baker,
                    availableIn: prod.Baker.availableIn + prod.prepTime
                }
            }
        })

        return products;
    } catch (err) {
        throw err;
    }
}

exports.createProduct = async ({ name, price, prepTime, BakerId, CategoryId }) => {
    try {
        let [product, created] = await Product.findOrCreate({
            where: { name, BakerId },
            defaults: {
                name,
                price,
                prepTime,
                BakerId,
                CategoryId
            }
        });

        if (!created) {
            throw {
                status: 409,
                message: "You already has a product with the same name"
            }
        }

        return product
    } catch (err) {
        throw err;
    }
}

exports.updateProduct = async ({ prodId, query }) => {
    try {
        let product = await Product.update({
            ...query

        }, {
            where: {
                id: prodId
            }
        })

        if (product[0] != 1) {
            throw {
                status: 400,
                message: "Error updating product"
            }
        }

        return product
    } catch (err) {
        throw err;
    }
}

exports.deleteProduct = async ({ id }) => {
    try {
        let deleted = await Product.destroy({
            where: {
                id
            }
        });

        return deleted
    } catch (err) {
        throw err;
    }
}

exports.resotreProduct = async ({ id }) => {
    try {
        let product = await Product.findOne({
            where: {
                id
            },
            paranoid: false
        });

        if (!product) {
            throw {
                status: 404,
                message: 'Product not found'
            }
        }

        let restored = await Product.restore({
            where: {
                id
            }
        });

        return restored
    } catch (err) {
        throw err;
    }
}
