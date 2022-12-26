const User = require('../models/user')

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/registerForm')
}

module.exports.createNewUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Camp!')
            res.redirect('/campgrounds');
        })
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('register')
    }
}

module.exports.renderLoginForm =  (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    console.log(req.session)
    const redirectUrl = req.session.returnTo ||  '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logout =  function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'good bye!')
        res.redirect('/campgrounds');
    });
}