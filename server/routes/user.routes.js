module.exports = app => {
    const users = require("../controllers/user.controller");
  
    // Create a new User
    app.post("/users", users.create);
  
    // Retrieve all Users
    app.get("/users", users.findAll);
  
    // Retrieve a single User with user_id
    app.get("/users/:id", users.findOne);
  
  };