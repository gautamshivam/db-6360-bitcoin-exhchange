const passport = require('passport');

exports.login = (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    passport.authenticate("local", (err, user, info) => {
        console.log("authenticate user", user);
        if(err) throw err;
        if(!user) {
            res.status(200)
            res.send("no user exists with these credential");
        }
        else {
            req.logIn(user, err => {
                if(err) throw err;
                res.send("successfully authenticated");
                console.log(req.user);
            })
        }
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    res.send("logged out");
}

exports.user = (req, res) => {
    console.log("found user...", req.user)
    const user = req.user;
    delete user['pwd']
    res.send(user);
}