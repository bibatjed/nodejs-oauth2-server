const model = require("../models/index");

module.exports.registrationController = async (req, res, next) => {
  try {
    await model.Users.create({
      ...req.body,
    });

    return res.json({
      message: "Successfully User Registration",
    });
  } catch (e) {
    return next(e);
  }
};
