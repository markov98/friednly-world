const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email is already taken!'],
        minLength: [10, 'Email must be at least 10 chars long!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [10, 'Email must be at least 4 chars long!']
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;