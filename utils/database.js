const sequelize = require('sequelize');

const database = new sequelize(
    'truck_loading',
    'root',
    '0000',
    {
        dialect: 'mysql',
        host: 'localhost',
        timezone: "+02:00"
    }
);

module.exports = database;