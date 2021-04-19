"use strict";
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

  return User;
};
