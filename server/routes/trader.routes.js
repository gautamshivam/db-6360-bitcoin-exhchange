module.exports = app => {
    const trader = require("../controllers/trader.controller");

    // Retrieve all traders
    app.get("/traders", trader.getAllTraders);

    // Retrieve all clients for a trader
    app.get("/traders/:id/clients", trader.getAllClients);

}