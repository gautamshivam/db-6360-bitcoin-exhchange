const sql = require("../db");
const query = require("../config/db.sql_query");

const Client = () => {

}

Client.getAll = result => {
    sql.query(query.findAllClientsSQL(), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("all clients: ", res);
        result(null, res);
    });
}

Client.findAllTraders = (id, result) => {
    sql.query(query.findAllTradersForClientSQL(id), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("all clients: ", res);
        result(null, res);
    });
}

Client.findOne = (id, result) => {
    sql.query(query.findOneClientsSQL(id), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("all clients: ", res);
        result(null, res);
    });
}

module.exports = Client;