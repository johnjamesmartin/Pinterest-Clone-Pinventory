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

module.exports = router;
