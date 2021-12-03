const sql = require('../db')
const query = require("../config/db.sql_query");


const Auth = function(auth) {
    this.email = auth.email;
    this.pwd = auth.pwd;
};

Auth.login = (auth, result) => {
    sql.query(query.findUserByEmailPwdSQL(auth), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("user logged in: ", res);
        result(null, res);
    
    });
};

Auth.findUserByEmail = (email, result) => {
    sql.query(query.findUserByEmail(email), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("user found: ", res);
        result(null, res[0]);
    });
};

module.exports = Auth;