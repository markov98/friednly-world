const Animal = require('../models/Animal');

exports.add = (animalData) => Animal.create(animalData);