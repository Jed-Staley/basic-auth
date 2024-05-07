'use strict';

const base64 = require('base-64');
const { Users } = require('../models/index');

async function basicAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send('Authorization header is missing');
  }

  const basicHeaderParts = req.headers.authorization.split(' ');
  const encodedString = basicHeaderParts.pop();
  const decodedString = base64.decode(encodedString);
  const [username, password] = decodedString.split(':');

  try {
    const user = await Users.authenticateBasic(username, password);
    if (!user) {
      throw new Error('User not found');
    }    
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
}

module.exports = basicAuth;