const sql = require("../db");
const query = require("../config/db.sql_query");

// constructor
const User = function(user) {
    this.fname = user.fname;
    this.lname = user.lname;
    this.phone = user.phone;
    this.cell_number = user.cell_number;
    this.user_type = user.user_type;
    this.email = user.email;
    this.pwd = user.pwd;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
};
  
User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("users: ", res);
        result(null, res);
    });
}

User.findOne = (id, result) => {
  sql.query(query.findUserByIdSQL(id), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);

  });
}

User.findAllTraders = (result) => {
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

module.exports = User;