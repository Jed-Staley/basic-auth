'use strict';

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Users = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.authenticateBasic = async function(username, password) {
    const user = await this.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    return user;
  };

  Users.hashPassword = async function(password) {
    return bcrypt.hash(password, 10);
  };

  return Users;
};