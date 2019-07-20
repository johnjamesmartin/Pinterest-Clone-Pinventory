/* Dependencies
 *****************************************/
const express = require('express');
const router = express.Router();

/* Controller modules
 *****************************************/
const user_controller = require('../controllers/userController');

/* Routes
 *****************************************/
router.get('/', user_controller.user_list_get);

router.get('/profile/:username', user_controller.user_profile_get);

module.exports = router;
