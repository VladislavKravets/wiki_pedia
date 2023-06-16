const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Page = sequelize.define('page', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Page;
