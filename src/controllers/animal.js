const router = require("express").Router();
const animalService = require('../services/animal');
const { isAuth } = require('../middlewares/auth');

// Add page

router.get('/add', isAuth, (req, res) => {
    res.render('animals/create');
});

router.post('/add', isAuth, async (req, res) => {
    const { name, years, need, kind, imageUrl, location, description } = req.body;

    try {
        await animalService.add({ name, years: Number(years), need, kind, imageUrl, location, description, owner: req.user });
        res.redirect('/dashboard');
    } catch (err) {
        const errMessage = err.message;
        res.render('animals/create', { errMessage });
    }
})

// Details Page

router.get('/:animalId/details', async (req, res) => {
    const animal = await animalService.getById(req.params.animalId).lean();

    if (!animal) {
        return res.redirect('/404');
    }

    const isOwner = req.user?._id === animal.owner.toString();
    const hasDonated = animal.donators.includes(req.user?._id);

    res.render('animals/details', { animal, isOwner, hasDonated })
})

module.exports = router;

