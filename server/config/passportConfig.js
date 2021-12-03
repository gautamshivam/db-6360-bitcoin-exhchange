const Auth = require("../model/auth.model");
const User = require("../model/user.model");
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;


module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            Auth.findUserByEmail(username, (err, user) => {
                console.log("find user by email,", username);
                if(err) throw err;
                if(!user) return done(null, false);
                bcrypt.compare(password, user.pwd, (err, result) => {
                    if(err) throw err;
                    if(result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            })
        })
    )

    passport.serializeUser((user, cb) => {
        cb(null, user.user_id)
    })
    passport.deserializeUser((id, cb) => {
        User.findOne(id, (err, user) => {
            cb(err,user);
        })
    })
}