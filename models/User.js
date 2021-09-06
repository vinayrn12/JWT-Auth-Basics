const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

//Mongoose hooks 

//This function is fired after a new instance is saved to the db
// userSchema.post('save', function(doc, next){
//     console.log('User created and saved.', doc);
//     next(); //Pass to the next section bcoz this is a middleware
// });

//This function is fired before a new instance is saved to the db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next(); //Pass to the next section bcoz this is a middleware
});

const User = mongoose.model('user', userSchema);

module.exports = User;