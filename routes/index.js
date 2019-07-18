const express = require('express');
const router = express.Router();

/* Controller modules
 *****************************************/
const pin_controller = require('../controllers/pinController');
const user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', pin_controller.index);

router.get(
  '/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  user_controller.user_profile_get
);

router.get('/login', (req, res, next) => {
  console.log('GOT TO LOGIN');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
