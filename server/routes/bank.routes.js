module.exports = app => {
    const bank = require("../controllers/bank.controller");

    // retrieve all transactions
    app.get("/bank", bank.getAll);

    // make deposit transaction
    app.post("/bank/deposit", bank.deposit);

    // make withdrawal transaction
    app.post("/bank/withdraw", bank.withdraw);

}