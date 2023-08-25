const router = require('express').Router();
const { save, findByEj, update, remove } = require('./MemberController');
const { authorizeUser, authorizeLeadership } = require('@middlewares/auth')

router.post('/member', authorizeLeadership, save);
router.get('/member', authorizeUser, findByEj);
router.patch('/member/:id', authorizeUser, update);
router.delete('/member/:id', authorizeLeadership, remove);

module.exports = router;