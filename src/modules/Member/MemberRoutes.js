const router = require('express').Router();
const { save, findByEj, update, remove } = require('./MemberController');
const { authorizeUser } = require('@middlewares/auth')

router.post('/project', authorizeUser, save);
router.get('/project', authorizeUser, findByEj);
router.patch('/project', authorizeUser, update);
router.delete('/project', authorizeUser, remove);

module.exports = router;