// models/index.js
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize(
    process.env.MYSQL_DB || 'db_workout',
    process.env.MYSQL_USERNAME || 'root',
    process.env.MYSQL_PASSWORD || '',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, // Disable logging; enable for debugging
    }
);

// Import Models
const User = require('./user')(sequelize, DataTypes);
const Routine = require('./routine')(sequelize, DataTypes);
const Exercise = require('./exercise')(sequelize, DataTypes);
const RoutineExercise = require('./routineExercise')(sequelize, DataTypes);

// Define Associations

// User and Routine
User.hasMany(Routine, {
    foreignKey: 'user_id',
    as: 'routines',
});
Routine.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

// Routine Model
Routine.belongsToMany(Exercise, {
    through: 'routine_exercises',
    foreignKey: 'routine_id',
    otherKey: 'exercise_id',
    as: 'exercises',
});

// Exercise Model
Exercise.belongsToMany(Routine, {
    through: 'routine_exercises',
    foreignKey: 'exercise_id',
    otherKey: 'routine_id',
    as: 'routines',
});

// RoutineExercise Model
RoutineExercise.belongsTo(Routine, {
    foreignKey: 'routine_id',
    as: 'routine',
});

RoutineExercise.belongsTo(Exercise, {
    foreignKey: 'exercise_id',
    as: 'exercise',
});

// Function to authenticate and synchronize the database
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // **Important:** Use `alter: true` for development. In production, use migrations.
        await sequelize.sync({ migrations: true });
        // await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully!');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
        throw error; // Rethrow the error to be handled in the server entry point
    }
};

// Initialize the database
initializeDatabase();

module.exports = {
    sequelize,
    User,
    Routine,
    Exercise,
    RoutineExercise,
};
