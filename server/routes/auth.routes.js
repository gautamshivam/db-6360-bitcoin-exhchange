
module.exports = app => {
    const auth = require("../controllers/auth.controller");

    app.post("/auth/login", auth.login);

    app.get("/auth/logout", auth.logout);

    app.get("/auth/user", auth.user);

}