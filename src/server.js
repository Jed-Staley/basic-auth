'use strict';

const express = require('express');
const app = express();
const authRoutes = require('./auth/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

function start(port) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = {
  app,
  start,
};