const express = require('express');
const router = express.Router();

/* Controller modules
 *****************************************/
const pin_controller = require('../controllers/pinController');

/* GET home page. */
router.get('/', pin_controller.index);

module.exports = router;
