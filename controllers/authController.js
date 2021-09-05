const User = require('../models/User');

const handleErrors = (err) => {
    let error = { email: '', password: ''};

    //Email duplication check
    if(err.code === 11000){
        error.email = 'This email is already registered'
        return error;
    }

    //Error validation
    //err object has errors array containing the detailed message which we loop through
    //The property is a destructured value from each indiviual error(email and password)
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message;
        });
    }

    return error;
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
        res.status(201).json(user);    
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = (req, res) => {
    res.send('logged in');
};