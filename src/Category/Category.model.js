module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("Categories", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataTypes.ENUM('generic','meat pie', 'fruit cake', 'fish pie', 'chicken pie', 'sweet cake'),
            allowNull: false,
            defaultValue: 'generic'
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
    return Category;
};