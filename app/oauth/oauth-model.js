const models = require('../models');

const { OAuthError } = require('oauth2-server');
/**
 * Convert all separate calls to associate calls(JOIN TABLES)
 */

module.exports.getAccessToken = async (accessToken) => {
    try {
        const accessTokenResult = await models.OAuthAccessToken.findOne({
            where: { access_token: accessToken },
        });

        if (!accessTokenResult) return false;

        const { access_token, expires, scope, client } = accessTokenResult;

        const userResult = await models.Users.findOne({
            where: { id: accessTokenResult.user_id },
            attributes: { exclude: ['password'] },
            raw: true,
        });

        return {
            accessToken: access_token,
            accessTokenExpiresAt: expires,
            scope: scope,
            client: client,
            user: userResult,
        };
    } catch (e) {
        return false;
    }
};

module.exports.getUser = async (username, password) => {
    const userResult = await models.Users.findOne({
        where: {
            username,
        },
    });

    if (!userResult || !(await userResult.validatePassword(password))) {
        throw new OAuthError('Invalid Email or Password', { code: 400 });
    }

    return userResult;
};

module.exports.saveToken = async (token, client, user) => {
    const createAccessTokenResult = await models.OAuthAccessToken.create({
        access_token: token.accessToken,
        expires: token.accessTokenExpiresAt,
        scope: token.scope,
        client_id: client.id,
        user_id: user.id,
    });

    const createRefreshTokenResult = await models.OAuthRefreshToken.create({
        refresh_token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        scope: token.scope,
        client_id: client.id,
        user_id: user.id,
    });

    return {
        accessToken: createAccessTokenResult.access_token,
        accessTokenExpiresAt: createAccessTokenResult.expires,
        refreshToken: createRefreshTokenResult.refresh_token,
        refreshTokenExpiresAt: createRefreshTokenResult.expires,
        scope: createAccessTokenResult.scope,
        client: { id: createAccessTokenResult.client_id },
        user: { id: createAccessTokenResult.user_id },
    };
};

module.exports.getClient = async (clientId, clientSecret) => {
    const options = {
        where: { client_id: clientId },
    };
    if (clientSecret) {
        options.where.client_secret = clientSecret;
    }

    const client = await models.OAuthClient.findOne(options);

    if (!client) return false;

    return {
        id: client.client_id,
        redirectUris: client.redirect_uri,
        grants: client.grant_types,
    };
};

module.exports.getRefreshToken = async (refreshToken) => {
    const refreshTokenResult = await models.OAuthRefreshToken.findOne({
        where: { refresh_token: refreshToken },
    });

    if (!refreshTokenResult) {
        return false;
    }

    const userResult = await models.Users.findOne({
        where: { id: refreshTokenResult.user_id },
    });

    const clientResult = await models.OAuthClient.findOne({
        where: { client_id: refreshTokenResult.client_id },
    });

    return {
        refreshToken: refreshTokenResult.refresh_token,
        refreshTokenExpiresAt: refreshTokenResult.expires_at,
        scope: token.scope,
        client: clientResult,
        user: userResult,
    };
};

module.exports.revokeToken = async (token) => {
    const refreshTokenDestroy = await models.OAuthRefreshToken.destroy({
        where: { refresh_token: token.refreshToken },
    });
    return refreshTokenDestroy;
};

module.exports.verifyScope = (token, scope) => {
    return token.scope === scope;
};
