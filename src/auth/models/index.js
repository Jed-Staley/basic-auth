'use strict';

const { Sequelize } = require('sequelize');
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;
const config = require('../../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

console.log('Environment:', env);
console.log('Database Configuration:', envConfig);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

let sequelize;

sequelize = new Sequelize(DATABASE_URL, { logging: false });

const users = require('./users-model');
console.log('user:', users);
const Users = users(sequelize);
console.log('User:', Users);

module.exports = {
  sequelize,
  Users,
};
