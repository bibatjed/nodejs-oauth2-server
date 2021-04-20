'use strict';

module.exports = (sequelize, DataTypes) => {
    const OAuthRefreshToken = sequelize.define(
        'OAuthRefreshToken',
        {
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            client_id: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
            expires: DataTypes.DATE,
            scope: DataTypes.STRING,
        },
        {
            timestamps: false,
            paranoid: true,
            underscored: true,
            tableName: 'oauth_refresh_tokens',
        }
    );

    return OAuthRefreshToken;
};
