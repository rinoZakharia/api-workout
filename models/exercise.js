const { DataTypes } = require('sequelize');

const Exercise = (sequelize) => {
    return sequelize.define('exercise', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        equipment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        muscle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        how: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};

module.exports = Exercise;