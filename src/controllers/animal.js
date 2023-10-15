const router = require("express").Router();

router.get('/add', (req, res) => {
    res.render('animals/create');
});

module.exports = router;

