const {Router} = require('express');
const {check} = require('express-validator');

const {validateToken} = require('../middlewares/validate-token');
const {fieldsValidator} = require('../middlewares/fields-validator');
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const {isDate} = require('../helpers/isDate');

const router = Router();
router.use(validateToken);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'El titulo de la nota es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        fieldsValidator
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;