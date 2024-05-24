const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Question = require('./Question');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Question = Question;

module.exports = db;