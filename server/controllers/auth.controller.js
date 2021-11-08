const Auth = require("../model/auth.model.js");

exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a deposit
    const auth = new Auth({
        email: req.body.email,
        pwd: req.body.pwd,
    });

    //  deposit money for a client
    Auth.login(auth, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Customer."
        });
        else res.send(data);
    });
}