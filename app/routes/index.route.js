const express = require('express');
const router = express.Router();

const OAuthServer = require('oauth2-server');

const registrationRoute = require('./registration.route');
const authRoute = require('./auth.route');
const profileRoute = require('./profile.route');

const authModel = require('../oauth/oauth-model');

global.oauthServer = new OAuthServer({
    model: authModel,
    requireClientAuthentication: { password: false, refresh_token: false },
});

router.use('/registration', registrationRoute);
router.use('/authenticate', authRoute);
router.use('/profile', profileRoute);

module.exports = router;
