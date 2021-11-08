const Trader = require("../model/trader.model.js");


// Find one client by id
exports.getAllClients = (req, res) => {
    Trader.getAllClients(req.params.id, (err, data) => {
         if (err)
             res.status(500).send({
             message:
                 err.message || "Some error occurred while retrieving User."
             });
         else res.send(data);
    })
};

// Find all Users who are traders
exports.getAllTraders = (req, res) => {
    Trader.findAllTraders((err, data) => {
         if (err)
             res.status(500).send({
             message:
                 err.message || "Some error occurred while retrieving User."
             });
         else res.send(data);
    })
 };