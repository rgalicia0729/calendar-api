const {Router} = require('express');
const {check} = require('express-validator');

const {fieldsValidator} = require('../middlewares/fields-validator');
const {login, createUser, renewToken} = require('../controllers/auth');

const router = Router();

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        fieldsValidator
    ],
    login
);

router.post(
    '/new',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser mayor a 4 letras').isLength({min: 5}),
        fieldsValidator
    ],
    createUser
);

router.get('/renew', renewToken);

module.exports = router;