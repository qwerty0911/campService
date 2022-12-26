const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users')
const passport = require('passport');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.createNewUser));

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout );

module.exports = router;