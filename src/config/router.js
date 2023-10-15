const router = require("express").Router();
const homeController = require('../controllers/home');
const animalController = require('../controllers/animal');
const userController = require('../controllers/user');

router.use(homeController);
router.use('/animals', animalController);
router.use('/users', userController);

router.get('*', (req, res) => {
    res.redirect('/404');
})

module.exports = (app) => {
    app.use(router);
};