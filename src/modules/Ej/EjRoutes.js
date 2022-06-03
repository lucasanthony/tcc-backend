const router = require('express').Router();
const { save, findAll, findById } = require('./EjController');

router.post('/ej', save);
router.get('/ej/:id', findById);
router.get('/ej', findAll);

module.exports = router;