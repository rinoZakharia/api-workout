const { Sequelize, DataTypes } = require('sequelize');

const Muscle = (sequelize) => {
    return sequelize.define('muscle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};

module.exports = Muscle;