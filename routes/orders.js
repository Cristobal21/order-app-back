const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const {
  createEvent,
  deleteEvent,
  updateEvent,
  getEvent,
  getEventById,
  deleteAllEvents,
  getEventFalse
} = require('../controllers/admin')

const router = Router()

// const sent = false
// const stringSent = sent.toString()

router.post(
  '/',
  [
    // middlewares
    check('producto', 'El producto es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('referencia', 'La referencia es obligatoria').not().isEmpty(),
    check('numero', 'El número de contacto es obligatorio').not().isEmpty(),
    validarCampos
  ],
  createEvent
)

router.get('/', getEvent)

// router.get(`/:${stringSent}`, getEventFalse)
router.get('/adminSent', getEventFalse)

router.get('/:id', getEventById)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

router.delete('/', deleteAllEvents)

module.exports = router
