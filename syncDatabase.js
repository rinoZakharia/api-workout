require('dotenv').config();
const { Sequelize } = require('sequelize');
const User = require('./models/User');

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
        const UserModel = User(sequelize);
        // await sequelize.sync({ alter: true });
        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

module.exports = syncDatabase;
