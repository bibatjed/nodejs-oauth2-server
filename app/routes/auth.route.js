const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth.controller');

router.route('/token').post(login);

module.exports = router;
