
const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(process.env.NAME, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000,
  },
});
    