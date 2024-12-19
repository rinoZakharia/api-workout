require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel = require('./models/user');
const RoutineModel = require('./models/routine');
const ExerciseModel = require('./models/exercise');
const MuscleModel = require('./models/muscle');
const RoutineExerciseModel = require('./models/routineExercise');
const ExerciseMuscleModel = require('./models/exerciseMuscle');

const sequelize = new Sequelize(
    process.env.MYSQL_DB || 'db_workout',
    process.env.MYSQL_USERNAME || 'root',
    process.env.MYSQL_PASSWORD || '',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

async function syncDatabase() {
    try {
        const User = UserModel(sequelize);
        const Routine = RoutineModel(sequelize);
        const Exercise = ExerciseModel(sequelize);
        const Muscle = MuscleModel(sequelize);
        const RoutineExercise = RoutineExerciseModel(sequelize);
        const ExerciseMuscle = ExerciseMuscleModel(sequelize);

        User.hasMany(Routine, {
            foreignKey: 'user_id',
            as: 'routines',
        });
        Routine.belongsTo(User, {
            foreignKey: 'user_id',
            as: 'user',
        });

        Routine.belongsToMany(Exercise, {
            through: RoutineExercise,
            foreignKey: 'routine_id',
            otherKey: 'exercise_id',
            as: 'exercises',
        });
        Exercise.belongsToMany(Routine, {
            through: RoutineExercise,
            foreignKey: 'exercise_id',
            otherKey: 'routine_id',
            as: 'routines',
        });

        Exercise.belongsToMany(Muscle, {
            through: ExerciseMuscle,
            foreignKey: 'exercise_id',
            otherKey: 'muscle_id',
            as: 'muscles',
        });
        Muscle.belongsToMany(Exercise, {
            through: ExerciseMuscle,
            foreignKey: 'muscle_id',
            otherKey: 'exercise_id',
            as: 'exercises',
        });

        // await sequelize.sync({ alter: true });
        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

module.exports = syncDatabase;
