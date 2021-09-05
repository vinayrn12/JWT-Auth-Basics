const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'The password must contain atleast 8 characters']
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;