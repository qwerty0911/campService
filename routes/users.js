const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');

const User = require('../models/user')

router.get('/register', (req, res) => {
    res.render('users/registerForm')
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser)
        req.flash('success', 'Welcome to Camp!')
        res.redirect('/campgrounds');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('register')
    }

}));

module.exports = router;