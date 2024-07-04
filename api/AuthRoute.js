const { Signup, Login, Logout } = require('../controllers/AuthController');
const router = require("express").Router();

router.post('/login', Login)
router.post('/signup', Signup)
router.get('/logout', Logout)


module.exports = router;