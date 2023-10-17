const { getById } = require('../services/animal');

exports.checkOwnership = async (req, res, next) => {
    const animal = await getById(req.params.animalId).lean();
    if (!animal || !req.user || req.user._id !== animal.owner.toString()) {
        return res.redirect('/404');
    }
    next();
}