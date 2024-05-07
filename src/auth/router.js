'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic');
const { sequelize } = require('./models/index');
const Users = require('./models/users-model')(sequelize);

router.post('/signup', async (req, res) => {
  try {
    req.body.password = await Users.hashPassword(req.body.password);
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(403).send('Error creating user');
  }
});

router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;