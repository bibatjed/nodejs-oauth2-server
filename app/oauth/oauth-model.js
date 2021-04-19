const models = require("../models");
module.exports.getAccessToken = async (accessToken) => {
  try {
    const accessTokenResult = await models.OAuthAccessToken.findOne({
      where: { access_token: accessToken },
    });

    if (!accessTokenResult) return false;

    const { access_token, expires_at, scope, client, user } = accessTokenResult;

    return {
      accessToken: access_token,
      accessaccessTokenResultExpiresAt: expires_at,
      scope: scope,
      client: client, // with 'id' property
      user: user,
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

  if (!userResult || !userResult.validatePassword(password)) {
    throw {
      status: 400,
      message: "Invalid Email and Password.",
    };
  }

  return userResult;
};
