const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/sign_up', authController.user_get_sign_up);
router.post('/sign_up', authController.user_post_sign_up);
router.get('/log_in', authController.user_get_log_in);
router.post('/log_in', authController.user_post_log_in);
router.get('/profile', authController.user_profile);

// router.get('/users/:id', authController.user_details);
// router.delete('/users/:id', authController.user_delete);

module.exports = router;