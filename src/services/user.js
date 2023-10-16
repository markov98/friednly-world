const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwt } = require('../librery/jwt');
const { SECRET } = require('../config/constants');

exports.register = (email, password) => User.create({ email, password });

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid username or password!');
    }

    const payload = {
        _id: user._id,
        email: user.email
    };

    const token = await jwt.sign(payload, SECRET, {expiresIn: '3d'});

    return token;
};