"use strict";

const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      timestaps: true,
      paranoid: true,
      underscored: true,
      tableName: "users",
    }
  );

  User.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  };

  User.prototype.validatePassword = function () {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
