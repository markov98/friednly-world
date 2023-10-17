const router = require("express").Router();
const animalService = require('../services/animal');

// Add page

router.get('/add', (req, res) => {
    res.render('animals/create');
});

router.post('/add', async (req, res) => {
    const { name, years, need, kind, imageUrl, location, description } = req.body;

    try {
        await animalService.add({ name, years: Number(years), need, kind, imageUrl, location, description });
        res.redirect('/dashboard');
    } catch (err) {
        const errMessage = err.message;
        res.render('animals/create', {errMessage});
    }
})

module.exports = router;

