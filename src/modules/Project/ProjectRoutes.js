const router = require('express').Router();
const { save, findByEj, update, remove } = require('./ProjectController');
const { authorizeUser } = require('@middlewares/auth')

router.post('/project', authorizeUser, save);
router.get('/project', authorizeUser, findByEj);
router.patch('/project/:id', authorizeUser, update);
router.delete('/project/:id', authorizeUser, remove);

module.exports = router;