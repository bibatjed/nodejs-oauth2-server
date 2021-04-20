const express = require('express');
const router = express.Router();

const OAuthServer = require('oauth2-server');

const registrationRoute = require('./registration.route');

const authRoute = require('./auth.route');

const authModel = require('../oauth/oauth-model');

global.oauthServer = new OAuthServer({
    model: authModel,
    requireClientAuthentication: { password: false },
});

router.use('/registration', registrationRoute);

router.use('/authenticate', authRoute);

module.exports = router;
