const User = require('../models/User');

exports.register = (email, password) => User.create({ email, password });