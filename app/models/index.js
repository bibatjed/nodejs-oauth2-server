const fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    lodash = require('lodash'),
    db = {};

const sequelize = new Sequelize(
    process.env.DB_DEFAULT,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
    }
);

fs.readdirSync(__dirname)
    .filter(function (file) {
        return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db);
    }
});

module.exports = lodash.extend(
    {
        sequelize: sequelize,
        Sequelize: Sequelize,
    },
    db
);
