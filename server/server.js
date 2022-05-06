const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("./database/db");

//add the middleware that makes sure that our server parses incoming json/application requests 
//→ we need this so that we can access values in our req.body easier (check imageboard)
app.use(compression());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));


////////// REQUIERE COOKIE-SESSION ///////////////////////////////////
const cookieSession = require('cookie-session');
const { request } = require('express');
app.use(cookieSession({
    secret: `noscooters`,
    maxAge: 1000 * 60 * 60 * 24 * 14,

    sameSite: true
}));

//================================================================

app.get('/user/id.json', function(req, res) {
    res.json({
        userId: req.session.userId // this needs to be changed to => req.session.userId
    });
});

app.get('/welcome', function(req, res) {
    console.log("WELCOME PAGE");
})

// =====================POST ON REGISTER==========================
app.post('/register', function(req, res) {
    console.log("POST ON REGISTER 📝")
    let { firstname, lastname, email, password } = req.body;

    console.log(firstname, lastname, email, password);
    // call createUser with passed arguments
    db.createUser(req.body)
        .then(({ rows }) => {
            // store the id in a cookie

            req.session.userId = rows[0].id
            res.json({ success: true });
            //res.redirect("/welcome")
            console.log("⬆️ Upload Complete!!")
            console.log("ROWS", rows);

            // res.redirect("/profile")
        })
        .catch((error) => {
            //  res.render("register")
            res.json({ success: false });

            console.log("USER EXISTS ALREADY EXISTS ❌", error);

            // hint: error.constraint === "users_email_key"
            // is your friend!
            // res.sendStatus(500);
        });
});
//================================================================


//================================================================


app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function() {
    console.log("I'm listening. 🟢");
});