"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const helmet= require("helmet")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedIn = ensureLogIn({setReturnTo:false});

require("dotenv").config({path:"./.env"});
const { MONGO_URI } = process.env;

const sessionStore = new MongoDBStore({
    uri: MONGO_URI,
    collection: 'user_session'
});

const PORT = 8000;

const {getAds, getAd, getMe, addNewAd} = require("./routes/handlers");
const { singIn, signOut, signUp, afterSingIn } = require("./routes/auth");

express()

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
.use(morgan("tiny"))
.use(express.json())
.use(cookieParser())
// Any requests for static files will go into the public folder
.use(express.static("public"))
.use(session({
    secret: 'This is a secret',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: sessionStore
}))
.use(passport.authenticate('session'))
// .use(csrf())

//Rest Endpoints
.use((req, res, next)=> {
    const msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
  })
// .use((req, res, next) =>{
//     res.locals.csrfToken = req.csrfToken();
//     next();
// })
// // catch 404 and forward to error handler
// .use((req, res, next) =>{
//     next(createError(404));
// })
 
//   // error handler
// .use((err, req, res, next) =>{
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// })
.get("/api/ads", getAds)
.get("/api/adDetails/:id", getAd)
.get("/api/me", ensureLoggedIn, getMe)
.post("/api/signIn", singIn, afterSingIn)
.post("/api/signOut", signOut)
.post("/api/signUp", signUp)
.post("/api/newAd" , ensureLoggedIn, addNewAd)


//

.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
})

// Node spins up our server and sets it to listen on port 8000.
.listen(PORT, () => console.info(`Listening on port ${PORT}`));