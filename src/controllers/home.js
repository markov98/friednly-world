const router = require("express").Router();
const animalService = require('../services/animal');

router.get('/', async (req, res) => {
    const animals = await animalService.getLastThree();
    res.render('home');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.get('/search', (req, res) => {
    res.render('search');
})

router.get('/404', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;