module.exports.getProfileController = async (req, res, next) => {
    try {
        return res.json({
            message: 'Successfully Retrieving Profile',
            result: {
                ...req.user,
            },
        });
    } catch (e) {
        return next(e);
    }
};
