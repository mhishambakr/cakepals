module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Orders", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: Sequelize.DataTypes.ENUM('accepted','rejected', 'pending'),
            allowNull: false,
            defaultValue: 'pending'
        },
        paymentMethod: {
            type: Sequelize.DataTypes.ENUM('cash on delivery','credit card'),
            allowNull: false,
            defaultValue: 'cash on delivery'
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        deliveredAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
    }, {
        paranoid: true,
        deletedAt: 'destroyTime'
    });
    return Order;
};