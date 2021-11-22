module.exports = app => {
    const client = require("../controllers/client.controller");

    // Retrieve all clients
    app.get("/clients", client.getAll);

    // Retrieve all traders for client
    app.get("/clients/:id/traders", client.getAllTraders);

    // Retrieve single clients personal balance and info
    app.get("/clients/:id", client.findOne);
}