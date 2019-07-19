/* Dependencies
 *****************************************/
const express = require('express');
const router = express.Router();

/* Controller modules
 *****************************************/
const pin_controller = require('../controllers/pinController');
const genre_controller = require('../controllers/genreController');

/* Routes
 *****************************************/
router.get('/', pin_controller.pin_list_get);

router.get('/create', pin_controller.pin_create_get);
router.post('/create', pin_controller.pin_create_post);
router.post('/save/:id', pin_controller.pin_save_post);

router.get('/genre/create', genre_controller.genre_create_get);
router.post('/genre/create', genre_controller.genre_create_post);
router.get('/genres', genre_controller.genre_list);
router.get('/genre/:id', genre_controller.genre_detail);
router.get('/genre/:id/delete', genre_controller.genre_delete_get);
router.post('/genre/:id/delete', genre_controller.genre_delete_post);
router.get('/genre/:id/update', genre_controller.genre_update_get);
router.post('/genre/:id/update', genre_controller.genre_update_post);

module.exports = router;
