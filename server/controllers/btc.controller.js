const BTC = require("../model/btc.model.js");

exports.trade = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a deposit
    const trade = new BTC.Trade({
        client_id: req.body.client_id,
        trader_id: req.body.trader_id,
        btc_qty: req.body.btc_qty,
        btc_rate: req.body.btc_rate,
        transaction_type: req.body.transaction_type,
        commission_type: req.body.commission_type,
        commission_value: req.body.commission_value,
    });

    //  deposit money for a client
    BTC.trade(trade, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Customer."
        });
        else res.send(data);
    });
}

// Find all transactions
exports.getAllTrades = (req, res) => {
    const client_id = req.query.client_id;
    const trader_id = req.query.trader_id;
    BTC.getAllTrades({client_id:client_id, trader_id:trader_id},(err, data) => {
         if (err)
             res.status(500).send({
             message:
                 err.message || "Some error occurred while retrieving User."
             });
         else res.send(data);
    })
};