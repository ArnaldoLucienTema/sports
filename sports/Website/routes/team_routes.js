var express = require('express');
var router = express.Router();
var TeamController = require('../controllers/team_controller.js');

router.get('/:id/players', TeamController.players);

router.get('/:id', TeamController.show);

router.get('/', TeamController.list);

router.post('/', TeamController.create);

router.put('/:id', TeamController.update);

router.delete('/:id', TeamController.remove);

module.exports = router;
