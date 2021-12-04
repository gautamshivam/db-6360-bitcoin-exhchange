const sql = require("../db");
const query = require("../config/db.sql_query");

const bank = () => {

}



bank.Deposit = function(deposit){
  this.client_id = deposit.client_id;
  this.trader_id = deposit.trader_id;
  this.amount = deposit.amount;
  this.type = "DEPOSIT";
  this.status = "APPROVED"
};

bank.Withdrawal = function(deposit){
  this.client_id = deposit.client_id;
  this.trader_id = deposit.trader_id;
  this.amount = deposit.amount;
  this.type = "WITHDRAW";
  this.status = "APPROVED"
};

bank.getAll = (queryParams,result) => {
    if(queryParams.client_id == null && queryParams.trader_id == null) {
      sql.query(query.findAllBankTransactions(), (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("all clients: ", res);
          result(null, res);
      });
    }
    else if(queryParams.client_id != null && queryParams.trader_id != null) {
      sql.query(query.findAllBankTransactionsClientTrader(queryParams.client_id,queryParams.trader_id), (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("all clients: ", res);
          result(null, res);
      });
    }
    else if(queryParams.client_id != null) {
      sql.query(query.findAllBankTransactionsClient(queryParams.client_id), (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("all transactions: ", res);
          result(null, res);
      });
    } 
    else if(queryParams.trader_id != null) {
      sql.query(query.findAllBankTransactionsTrader(queryParams.trader_id), (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("all transactions: ", res);
          result(null, res);
      });
    } 
  
}

bank.makeBankTransaction = (bankTransaction, result) => {
  if(bankTransaction.type === 'WITHDRAW'){
    checkBalance(bankTransaction, (balance) => {
      console.log(`available balance: ${balance}`);
      if(balance < bankTransaction.amount && false) {
        result({message: "not enough balance!!"}, null);
        return;
      } else {
        sql.query("INSERT INTO bankTransactions SET ?", bankTransaction, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("created transaction: ", { id: res.insertId, ...bankTransaction });
          result(null, { id: res.insertId, ...bankTransaction });
        });
      }
    });
  } else {
    sql.query("INSERT INTO bankTransactions SET ?", bankTransaction, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created transaction: ", { id: res.insertId, ...bankTransaction });
      result(null, { id: res.insertId, ...bankTransaction });
    });
  }
  
}

function checkBalance(transaction, availableBalance) {
  if(transaction.client_id != null && transaction.trader_id !=null) {
      sql.query(query.findOneClientForTraderSQL(transaction.trader_id, 
        transaction.client_id), (err, res) => {
          if (err) {
            console.log("error: ", err);
            return 0;
          }
          availableBalance(res[0].fiat_balance);
      });
  } else if(transaction.client_id != null) {
      sql.query(query.findOneClientsSQL(transaction.client_id, 
        transaction.client_id), (err, res) => {
          if (err) {
            console.log("error: ", err);
            return 0;
          }
          availableBalance(res[0].fiat_balance);
      });
  }else availableBalance(0);
}

module.exports = bank;