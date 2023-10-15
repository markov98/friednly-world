const router = require("express").Router();
const homeController = require('../controllers/home');

router.use(homeController);

router.get('*', (req, res) => {
    res.redirect('/404');
})

module.exports = (app) => {
    app.use(router);
};