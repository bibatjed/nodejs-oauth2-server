const { Request, Response } = require('oauth2-server');

module.exports.login = async (req, res, next) => {
    try {
        const request = new Request(req);
        const response = new Response(res);

        const userLoginObject = await global.oauthServer.token(
            request,
            response
        );

        return res.json({
            ...userLoginObject,
        });
    } catch (e) {
        return next(e);
    }
};
