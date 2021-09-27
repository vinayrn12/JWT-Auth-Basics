const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web token exists and is verified
    if(token){
        jwt.verify(token, 'This is the hashing key secret string', (err, decodedToken) => {
            if(err){
                console.log(err);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
};

//Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'This is the hashing key secret string', async (err, decodedToken) => {
            if(err){
                console.log(err);
                res.locals.user = null;
                next();
            }
            else{
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser };