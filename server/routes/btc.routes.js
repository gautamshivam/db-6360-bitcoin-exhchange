module.exports = app => {
    const btc = require("../controllers/btc.controller");

    // make a trade
    app.post("/btc/trade", btc.trade);
    
    // get trades
    app.get("/btc/trade", btc.getAllTrades);

}