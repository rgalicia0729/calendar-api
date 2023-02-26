const {Router} = require('express');
const {login, createUser, renewToken} = require('../controllers/auth');

const router = Router();

router.post('/', login);

router.post('/new', createUser);

router.get('/renew', renewToken);

module.exports = router;