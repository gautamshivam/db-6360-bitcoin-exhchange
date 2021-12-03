const User = require("../model/user.model.js");

// // Create and Save a new User
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a User
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        cell_number: req.body.cell_number,
        user_type: req.body.user_type,
        email: req.body.email,
        pwd: req.body.password,
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Customer."
        });
        else res.send(data);
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving User."
          });
        else res.send(data);
    });
};

// Find a single User with email and pwd
exports.findOne = (req, res) => {
   User.findOne(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving User."
            });
        else res.send(data);
   })
};

// // Update a Customer identified by the customerId in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Customer with the specified customerId in the request
// exports.delete = (req, res) => {
  
// };

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  
};