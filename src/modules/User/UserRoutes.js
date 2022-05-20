const router = require('express').Router();
const { save, findByEj, remove, update } = require('./UserController');
const { authorizePresident, authorizeUser } = require('@middlewares/auth')

router.post('/user', authorizePresident, save);
router.get('/user', authorizePresident, findByEj);
router.delete('/user/:id', authorizePresident, remove);
router.patch('/user/:id', authorizeUser, update);

module.exports = router;