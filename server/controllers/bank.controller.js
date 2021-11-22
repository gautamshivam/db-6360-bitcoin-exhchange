const bank = require("../model/bank.model.js");


// Find all transactions
exports.getAll = (req, res) => {
    client_id = req.query.client_id;
    trader_id = req.query.trader_id;
    bank.getAll({client_id:client_id, trader_id:trader_id},(err, data) => {
         if (err)
             res.status(500).send({
             message:
                 err.message || "Some error occurred while retrieving User."
             });
         else res.send(data);
    })
};

// deposit money for client
exports.deposit = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a deposit
    const deposit = new bank.Deposit({
        client_id: req.body.client_id,
        trader_id: req.body.trader_id,
        amount: req.body.amount,
    });

    if (deposit.client_id == null && deposit.trader_id == null) {
        res.status(400).send({
            message: "client id or trader id required."
        });
    }else if (deposit.amount < 0) {
        res.status(400).send({
            message: "amount must be greater than 0."
        });
    } else {
        //  deposit money for a client
        bank.makeBankTransaction(deposit, (err, data) => {
            if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Customer."
            });
            else res.send(data);
        });
    }


};

// deposit money for client
exports.withdraw = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a withdrawal
    const withdraw = new bank.Withdrawal({
        client_id: req.body.client_id,
        trader_id: req.body.trader_id,
        amount: req.body.amount,
    });

    if (withdraw.client_id == null && withdraw.trader_id == null) {
        res.status(400).send({
            message: "client id or trader id required."
        });
    }else if (withdraw.amount < 0) {
        res.status(400).send({
            message: "amount must be greater than 0."
        });
    } else {
        // withdraw money for client
        bank.makeBankTransaction(withdraw, (err, data) => {
            if (err) res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Customer."
            });
            else res.send(data);
        });
    }
};