const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    let errors = { email: '', password: ''};

    //Email duplication check
    if(err.code === 11000){
        errors.email = 'This email is already registered'
        return errors;
    }

    //Error validation
    //err object has errors array containing the detailed message which we loop through
    //The property is a destructured value from each indiviual error(email and password)
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'This is the hashing key secret string', {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.create({ email, password });
        console.log(user);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user._id });    
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = (req, res) => {
    res.send('logged in');
};