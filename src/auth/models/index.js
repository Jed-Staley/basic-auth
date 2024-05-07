'use strict';

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Assuming PostgreSQL
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const Users = require('./users-model')(sequelize);

module.exports = {
  sequelize,
  Users,
};
