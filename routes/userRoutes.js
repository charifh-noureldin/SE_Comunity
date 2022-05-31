const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/sign_up', userController.user_get_sign_up);
router.post('/sign_up', userController.user_post_sign_up);
router.get('/log_in', userController.user_get_log_in);
router.post('/log_in', userController.user_post_log_in);
router.get('/profile', userController.user_profile);

// router.get('/users/:id', authController.user_details);
// router.delete('/users/:id', authController.user_delete);

module.exports = router;