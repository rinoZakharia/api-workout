const { Sequelize, DataTypes } = require('sequelize');

const ExerciseMuscle = (sequelize) => {
    return sequelize.define('exercise_muscle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        exercise_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'exercises',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        muscle_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'muscles',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
    });
};

module.exports = ExerciseMuscle;