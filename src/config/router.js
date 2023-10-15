const router = require("express").Router();

router.get('/', (req, res) => {
    res.send('Test');
});

module.exports = (app) => {
    app.use(router);
};