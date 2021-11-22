const express = require("express");

const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bitcoin application." });
});

require("./routes/client.routes")(app);
require("./routes/user.routes")(app);
require("./routes/btc.routes")(app);
require("./routes/trader.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/bank.routes")(app);


// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});