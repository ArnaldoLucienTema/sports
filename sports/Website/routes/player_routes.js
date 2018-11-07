var express = require('express');
var router = express.Router();
var PlayerController = require('../controllers/user_info_controller.js');


router.post('/', PlayerController.create);

router.post('/:id/recommendations', PlayerController.add_recommendation);

router.post('/:id/skills', PlayerController.add_skill_vote);

router.post('/:id/followers', PlayerController.follow);

router.post('/search', PlayerController.search);

router.get('/', PlayerController.list);

router.get('/:id', PlayerController.show);

router.get('/:id/recommendations', PlayerController.list_recommendations);

router.get('/:id/skills', PlayerController.list_skills);

router.get('/:id/followers', PlayerController.list_followers);

router.get('/:id/followed', PlayerController.list_followed);

router.put('/:id', PlayerController.update);

router.delete('/:id', PlayerController.remove);

router.delete('/:id/followers/:follower_id', PlayerController.unfollow);

module.exports = router;
