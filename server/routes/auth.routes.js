
module.exports = app => {
    const auth = require("../controllers/auth.controller");

    // Retrieve all clients
    app.post("/auth/login", auth.login);

}