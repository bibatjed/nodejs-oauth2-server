const express = require('express');
const router = express.Router();

const { getProfileController } = require('../controllers/profile.controller');

const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, getProfileController);

module.exports = router;
