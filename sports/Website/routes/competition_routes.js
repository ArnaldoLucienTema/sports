var express = require('express');
var router = express.Router();
var CompetitionController = require('../controllers/competition_controller.js');

/*
 * GET
 */

router.get('/:id/teams', CompetitionController.teams);

router.get('/:id', CompetitionController.show);

router.get('/', CompetitionController.list);

/*
 * POST
 */
router.post('/', CompetitionController.create);

/*
 * PUT
 */
router.put('/:id', CompetitionController.update);

/*
 * DELETE
 */
router.delete('/:id', CompetitionController.remove);

module.exports = router;
