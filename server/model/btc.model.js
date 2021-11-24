const sql = require("../db");
const query = require("../config/db.sql_query");

const BTC = () => {

}

BTC.Trade = function(trade) {
    this.client_id = trade.client_id;
    this.trader_id = trade.trader_id;
    this.btc_qty = trade.btc_qty;
    this.btc_rate = trade.btc_rate;
    if(trade.transaction_type === 'BUY') {
      if(trade.commission_type === 'FIAT') {
        this.transaction_value = trade.btc_qty * trade.btc_rate + trade.commission_value;
      }
      if(trade.commission_type === 'BTC') {
        this.transaction_value = trade.btc_qty * trade.btc_rate;
        this.btc_qty = this.btc_qty - trade.commission_value;
      }
    } 
    if(trade.transaction_type === 'SELL') {
      if(trade.commission_type === 'FIAT') {
        this.transaction_value = trade.btc_qty * trade.btc_rate - trade.commission_value;
      }
      if(trade.commission_type === 'BTC') {
        this.transaction_value = (this.btc_qty - trade.commission_value) * trade.btc_rate;
      }
    }
    this.transaction_type = trade.transaction_type;
    this.commission_type = trade.commission_type;
    this.commission_value = trade.commission_value;
}

BTC.trade = (trade, result) => {
    if(trade.btc_qty < 0) {
      result({message:'btc qty or commission value not valid'}, null);
    } else {
      sql.query("INSERT INTO bitcoinTransactions SET ?", trade, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        console.log("created transaction: ", { id: res.insertId, ...trade });
        result(null, { id: res.insertId, ...trade });
      });
    }
}


BTC.getAllTrades = (queryParams,result) => {
  if(queryParams.client_id == null && queryParams.trader_id == null) {
    sql.query(query.findAllBTCTrades(), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("all trades: ", res);
        result(null, res);
    });
  }
  else if(queryParams.client_id != null && queryParams.trader_id != null) {
    sql.query(query.findAllBTCTradesClientTrader(queryParams.client_id,queryParams.trader_id), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("all trades client,trader: ", res);
        result(null, res);
    });
  }
  else if(queryParams.client_id != null) {
    sql.query(query.findAllBTCTradesClient(queryParams.client_id), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("all trades client: ", res);
        result(null, res);
    });
  } 
  else if(queryParams.trader_id != null) {
    sql.query(query.findAllBTCTradesTrader(queryParams.trader_id), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("all trades trader: ", res);
        result(null, res);
    });
  } 

}

module.exports = BTC;