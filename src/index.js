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


module.exports = {
    sequelize,
}