const router = require('express').Router();
const { save, findAll } = require('./EjController');

router.post('/ej', save);
router.get('/ej', findAll);

module.exports = router;