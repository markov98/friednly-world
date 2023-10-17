const Animal = require('../models/Animal');

exports.add = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getLastThree = () => {
    const query = Animal.find();
    query.sort({ _id: -1 });
    query.limit(3);
    return query.exec();
}

exports.getById = (animalId) => Animal.findById(animalId);