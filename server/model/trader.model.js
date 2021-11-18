const sql = require("../db");
const query = require("../config/db.sql_query");

const Trader = () => {

}

Trader.getAllClients = (id, result) => {
    sql.query(query.findAllClientsForTraderSQL(id), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log(`all clients for trader: ${id}`, res);
        result(null, res);
    });
}

Trader.findAllTraders = (result) => {
  sql.query(query.findAllTradersSQL(), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("all traders: ", res);
    result(null, res);

  });
}

module.exports = Trader;