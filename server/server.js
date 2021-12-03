const express = require("express");
var cookieParser = require('cookie-parser');

// passport dependencies
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const session = require('express-session')


const app = express();

// parse requests of content-type: application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// user session using passport
app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport);


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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Listening on ' + PORT);
})