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
    const hasDonated = animal.donators.map(el => el.toString()).includes(req.user?._id);

    res.render('animals/details', { animal, isOwner, hasDonated })
});

// Edit Page

router.get('/:animalId/edit', async (req, res) => {
    const animal = await animalService.getById(req.params.animalId).lean();

    if (!animal || req.user?._id !== animal.owner.toString()) {
        return res.redirect('/404');
    }

    res.render('animals/edit', { animal });
});

router.post('/:animalId/edit', async (req, res) => {
    const {animalId} = req.params;
    const { name, years, need, kind, imageUrl, location, description } = req.body;
    const animal = await animalService.getById(animalId).lean();

    if (!animal || req.user?._id !== animal.owner.toString()) {
        return res.redirect('/404');
    }

    try {
        await animalService.edit(animalId, { name, years: Number(years), need, kind, imageUrl, location, description });
        res.redirect(`/animals/${animalId}/details`);
    } catch (err) {
        const errMessage = err.message;
        res.render('animals/create', { errMessage });
    }
})

// Donatation

router.get('/:animalId/donate', async (req, res) => {
    try {
        const { animalId } = req.params;
        const animal = await animalService.getById(animalId).lean();
        const isOwner = req.user?._id === animal.owner.toString();
        const hasDonated = animal.donators.map(el => el.toString()).includes(req.user?._id);

        if (!req.user || isOwner || hasDonated) {
            throw new Error('Error');
        }

        await animalService.donate(animalId, req.user);
        res.redirect(`/animals/${animalId}/details`)
    } catch (err) {
        res.redirect('/404');
    }
})

module.exports = router;

