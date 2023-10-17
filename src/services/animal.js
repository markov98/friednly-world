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

exports.donate = (animalId, user) => Animal.findByIdAndUpdate(animalId, { $push: { donators: user } });

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData, { runValidators: true });

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);