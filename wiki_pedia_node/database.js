const {Sequelize} = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

module.exports = sequelize;
