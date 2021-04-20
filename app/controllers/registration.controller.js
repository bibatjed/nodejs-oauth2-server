const model = require('../models/index');

module.exports.registrationController = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const userResult = await model.Users.findOne({ where: { username } });
        if (userResult) {
            throw {
                status: 400,
                message: 'Username already exists',
            };
        }
        await model.Users.create({
            username,
            password: model.Users.generateHash(password),
        });

        return res.json({
            message: 'Successfully User Registration',
        });
    } catch (e) {
        return next(e);
    }
};
