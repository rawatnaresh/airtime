let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserCredential = require('../models/UserCredential');

/* Defining a Local Strategy for user Authentication  */
passport.use(new LocalStrategy({
    usernameField:'user[email]',
    passwordField:'user[password]',
},function(email, password, done) {
    UserCredential.findOne({email:email}).then(function(user) {
        if(!user || !user.validPassword(password) ) {
            return done(null, false, {errors:{'email of password':'is invalid'}});
        }

        return done(null, user);
    }).catch(done);
}));

module.exports = passport;