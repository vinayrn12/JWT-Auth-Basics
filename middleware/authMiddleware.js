const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };