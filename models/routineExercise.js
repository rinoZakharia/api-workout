const { DataTypes } = require('sequelize');

const RoutineExercise = (sequelize) => {
    return sequelize.define('routine_exercise', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        routine_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'routines',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
        set: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        repetition: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });
};

module.exports = RoutineExercise;