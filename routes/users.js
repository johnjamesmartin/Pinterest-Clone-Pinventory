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
router.get(
  '/edit/favourites/:username',
  user_controller.user_edit_favourites_get
);
router.get('/edit/pins/:username', user_controller.user_edit_pins_get);
router.post(
  '/removefavourite/:pin',
  user_controller.user_remove_favourite_post
);

module.exports = router;
