const { Request, Response } = require('oauth2-server');

module.exports.authMiddleware = async (req, res, next) => {
    try {
        const request = new Request(req);
        const response = new Response(res);

        const authenticateResult = await global.oauthServer.authenticate(
            request,
            response
        );

        req.user = authenticateResult.user;

        return next();
    } catch (e) {
        return next(e);
    }
};
