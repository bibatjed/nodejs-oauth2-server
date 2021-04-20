'use strict';

module.exports = (sequelize, DataTypes) => {
    const OAuthClient = sequelize.define(
        'OAuthClient',
        {
            client_id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            client_secret: DataTypes.STRING,
            redirect_uri: DataTypes.STRING,
            grant_types: DataTypes.JSON,
            scope: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        },
        {
            timestamps: false,
            underscored: true,
            tableName: 'oauth_clients',
        }
    );

    return OAuthClient;
};
