const router = require('express').Router();
const { save, findByEj, update, remove } = require('./MemberController');
const { authorizeUser } = require('@middlewares/auth')

router.post('/member', authorizeUser, save);
router.get('/member', authorizeUser, findByEj);
router.patch('/member/:id', authorizeUser, update);
router.delete('/member/:id', authorizeUser, remove);

module.exports = router;