const router = require("express").Router();

//Login Page
router.get('/login', (req, res) => {
    res.render('users/login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', (req, res) => {
    const {email, password, repeatPassword} = req.body;

    try {

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;