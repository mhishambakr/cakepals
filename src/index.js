const { DB, USER, PASSWORD, HOST, dialect } = require('../config/db.config.js');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: dialect,
        query: { raw: true }
    }
)

let User = require("./User/User.model")(sequelize, Sequelize);
let Member = require("./Member/Member.model")(sequelize, Sequelize);
let Baker = require("./Baker/Baker.model")(sequelize, Sequelize);
let Product = require("./Product/Product.model")(sequelize, Sequelize);
let Category = require("./Category/Category.model")(sequelize, Sequelize);
let Order = require("./Order/Order.model")(sequelize, Sequelize);

Member.belongsTo(User);
User.hasOne(Member);

Baker.belongsTo(User);
User.hasOne(Baker);

Product.belongsTo(Baker);
Baker.hasMany(Product);

Product.belongsTo(Category);
Category.hasMany(Product);

Order.belongsTo(Product);
Product.hasMany(Order);

Order.belongsTo(Member);
Member.hasMany(Order);

module.exports = {
    sequelize,
    User,
    Member,
    Baker,
    Product,
    Category,
    Order
}