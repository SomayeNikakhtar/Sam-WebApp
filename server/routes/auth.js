const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db/db')

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(new LocalStrategy({usernameField: 'email'}, async(username, password, cb) => {
    
    const user = await db.getUser(username);
    if (!user) { 
        return cb(null, false, { message: 'Incorrect username or password.' }); 
    }
    crypto.pbkdf2(password, Buffer.from(user.salt, 'base64'), 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        hashedPassword = hashedPassword
        if (!crypto.timingSafeEqual(Buffer.from(user.password, 'base64'), hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
      });
}));

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, in order to
 * fetch todo records and render the user element in the navigation bar, that
 * information is stored in the session.
 */
passport.serializeUser((user, cb) =>{
    // console.log(user)
    process.nextTick(() => {
      cb(null, { _id: user._id, username: user.username, name:user.name, email:user.email });
    });
});
  
passport.deserializeUser((user, cb) => {
    process.nextTick(() =>{
        return cb(null, user);
    });
});


/* POST /login/password
 *
 * This route authenticates the user by verifying a username and password.
 *
 * A username and password are submitted to this route via an HTML form, which
 * was rendered by the `GET /login` route.  The username and password is
 * authenticated using the `local` strategy.  The strategy will parse the
 * username and password from the request and call the `verify` function.
 *
 * Upon successful authentication, a login session will be established.  As the
 * user interacts with the app, by clicking links and submitting forms, the
 * subsequent requests will be authenticated by verifying the session.
 *
 * When authentication fails, the user will be re-prompted to login and shown
 * a message informing them of what went wrong.
 */
const singIn= (req, res, next)=>{
    // return res.status(200).json({status: 200 , data: "ads" })
    // req.body.username=req.body.email;
    const authenticate = passport.authenticate('local',function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).send(info); }
    
        // req / res held in closure
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            if (req.body.remember) {
                var oneHour = 3600000;
                req.session.cookie.expires = new Date(Date.now() + oneHour);
                req.session.cookie.maxAge = oneHour;
            } else {
                req.session.cookie.expires = false;
            }
          return res.status(200).json({status: 200 , user: {name:req.user.name , email:req.user.email} })
        });
    
      })
    authenticate(req, res, next);
}

const afterSingIn= (req, res, next)=>{
    // console.log(req.user)
    return res.status(200).json({status: 200 , user: {name:req.user.name , email:req.user.email} })
}


/* 
 *
 * This route logs the user out.
 */
const signOut= (req, res) => {
    req.logout();
    res.status(200).json({status: 200})
    // res.redirect('/');
};


/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
const signUp= async (req, res, next) =>{
    console.log(req.body)
    // return res.status(200).json({status: 200 , data: "ads" })
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', (err, hashedPassword) =>{
        if (err)
          return next(err); 
        console.log(hashedPassword.toString('base64'))
        const user={
            username: req.body.email.toLowerCase(), 
            email: req.body.email.toLowerCase(),
            password:hashedPassword.toString('base64'),
            salt: salt.toString('base64'),
            name: req.body.name

        }
        if (db.addUser(user)){
            const loggedInUser = {username: user.username}
            req.login(loggedInUser, function(err) {
                if (err) 
                    return next(err); 
                res.status(200).json({status: 200 , user: {name:user.name , email:user.email} })
                // res.redirect('/');
            });
        }
        
    });
};

module.exports ={singIn, signOut, signUp, afterSingIn}