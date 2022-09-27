const sequelize = require('sequelize');
const database = require('../utils/database');

const truck = database.define('truck', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    weight: {
        type: sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = truck;