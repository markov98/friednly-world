const router = require("express").Router();
const animalService = require('../services/animal');

router.get('/', async (req, res) => {
    const animals = (await animalService.getLastThree()).map(animal => animal.toObject());
    const isEmpty = animals.length === 0;
    res.render('home', { animals, isEmpty });
});

router.get('/dashboard', async (req, res) => {
    const animals = await animalService.getAll().lean();
    const isEmpty = animals.length === 0;
    res.render('dashboard', { animals, isEmpty });
});

router.get('/search', async (req, res) => {
    const animals = await animalService.getAll().lean();
    const isEmpty = animals.length === 0;
    res.render('search', { animals, isEmpty });
});

router.post('/search', async (req, res) => {
    const animals = await animalService.search(req.body.search).lean();
    const isEmpty = animals.length === 0;
    res.render('search', { animals, isEmpty });
});

router.get('/404', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;