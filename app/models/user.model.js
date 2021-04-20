'use strict';

const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'Users',
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
            paranoid: true,
            timestamps: true,
            underscored: true,
            tableName: 'users',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
        }
    );

    User.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync());
    };

    User.prototype.validatePassword = async function (password) {
        return bcrypt.compare(password, this.password);
    };

    return User;
};
