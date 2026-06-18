const Router = require('express');
const router = new Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');
const checkUserStatus = require('../middleware/checkUserStatus');

// ========================================
// PUBLIC ROUTES (NO authentication middleware)
// ========================================
router.post('/register', controller.register);
router.get('/confirm/:token', controller.confirmEmail);
router.post('/login', controller.login);

// ========================================
// PROTECTED ROUTES (WITH authentication + status check)
// The 5th Requirement: checkUserStatus middleware
// intercepts EVERY request except login/register
// ========================================
router.get('/users',
    passport.authenticate('jwt', { session: false }),
    checkUserStatus,
    controller.getUsers
);

router.patch('/users/status',
    passport.authenticate('jwt', { session: false }),
    checkUserStatus,
    controller.blockUsers
);

router.delete('/users',
    passport.authenticate('jwt', { session: false }),
    checkUserStatus,
    controller.deleteUsers
);

router.delete('/users/unverified/all',
    passport.authenticate('jwt', { session: false }),
    checkUserStatus,
    controller.deleteUnverified
);

// ========================================
// Email verification emulation
// Allows user to verify their own email via button click
// ========================================
router.post('/users/verify-email-emulation',
    passport.authenticate('jwt', { session: false }),
    checkUserStatus,
    controller.verifyEmailEmulation
);

module.exports = router;

