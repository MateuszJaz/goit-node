const express = require('express');
const router = express.Router();
const validate = require('../utils/validator');
const userController = require('../controller/userContoller');
const auth = require('../config/authMiddleware');

router.post('/signup', validate.findUserByEmail, userController.signUp);
router.post('/login', validate.findUserByEmail, userController.login);
router.get('/logout', auth, userController.logout);
router.get('/current', auth, userController.currentUser);
router.patch('/', auth, validate.updateSubscription, userController.updateSubs);

module.exports = router;
