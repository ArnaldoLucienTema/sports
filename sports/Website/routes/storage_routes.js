var express = require('express');
var router = express.Router();
var StorageController = require('../controllers/storage_controller.js');

router.get('/images/user_info_season/:id/*', StorageController.retrieve_image);

router.get('/images/team_info_season/:id/*', StorageController.retrieve_image);

router.get('/videos/user_info_season/:id/*', StorageController.retrieve_image);

router.get('/videos/team_info_season/:id/*', StorageController.retrieve_image);

module.exports = router;
