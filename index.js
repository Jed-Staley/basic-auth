'use strict';

require('dotenv').config();
const { start } = require('./src/server');
const { sequelize } = require('./src/auth/models/index');

sequelize.sync()
  .then(() => {
    start(process.env.PORT || 3000);
  })
  .catch(e => {
    console.error('Failed to start server:', e.message);
  });