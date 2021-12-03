const Client = require("../model/client.model.js");


// Find all clients
exports.getAll = (req, res) => {
    Client.getAll((err, data) => {
         if (err)
             res.status(500).send({
             message:
                 err.message || "Some error occurred while retrieving User."
             });
         else res.send(data);
    })
 };

// Find all traders for client
exports.getAllTraders = (req, res) => {
    Client.findAllTraders(req.params.id, (err, data) => {
         if (err)
             res.status(500).send({
             message:
                 err.message || "Some error occurred while retrieving User."
             });
         else res.send(data);
    })
 };

// Find one client by id
exports.findOne = (req, res) => {
    Client.findOne(req.params.id, (err, data) => {
         if (err)
             res.status(500).send({
             message:
                 err.message || "Some error occurred while retrieving User."
             });
         else res.send(data);
    })
 };





 
