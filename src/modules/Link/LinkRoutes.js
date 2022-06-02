const router = require('express').Router();
const { save, findByEj, update, remove } = require('./LinkController');
const { authorizeUser } = require('@middlewares/auth')

router.post('/link', authorizeUser, save);
router.get('/link', authorizeUser, findByEj);
router.patch('/link/:id', authorizeUser, update);
router.delete('/link/:id', authorizeUser, remove);

module.exports = router;