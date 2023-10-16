const User = require('../models/User');

exports.register = (username, password) => User.create({ username, password });