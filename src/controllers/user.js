const router = require("express").Router();
const userService = require('../services/user');

//Login Page
router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.login(email, password);

        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        const errMessage = err.message;
        res.status(404).render('users/login', { errMessage });
    }
});

// Register Page
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const {email, password, repeatPassword} = req.body;

    try {
        if (password !== repeatPassword) {
            throw new Error('Passwords do not match!');
        }

        await userService.register(email, password);

        const token = await userService.login(email, password);
        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/')
    } catch (err) {
        const errMessage = err.message;
        res.render('users/register', {errMessage});
    }
});

module.exports = router;