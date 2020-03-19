module.exports = function(req, res, next) {
    // check if there is not a user
    if (!req.user) {
        // send scathing message
        req.flash('error', 'You must be looged in to access this page');
        //redirect to login
        res.redirect('/auth/login');

    } else {
        //
            // carry on
        next();
    }
}