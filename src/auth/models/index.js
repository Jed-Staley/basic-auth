'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

console.log('Environment:', env);
console.log('Database Configuration:', envConfig);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    envConfig.database,
    envConfig.username,
    envConfig.password,
    {
      host: envConfig.host,
      dialect: envConfig.dialect,
      dialectOptions: envConfig.dialectOptions ? {
        ssl: {
          require: envConfig.dialectOptions.ssl.require,
          rejectUnauthorized: envConfig.dialectOptions.ssl.rejectUnauthorized,
        },
      } : {},
      logging: false,
    },
  );
}

const Users = require('./users-model')(sequelize);

module.exports = {
  sequelize,
  Users,
};
