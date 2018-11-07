var express = require('express');
const passport = require('passport');
var FootballUserInfo = require('../models/football_user_info.js');
var FootballTeam = require('../models/football_team.js');
var router = express.Router();
var UserController = require('../controllers/user_controller.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jwt = require('jsonwebtoken');

router.post('/', passport.authenticate('signup', {session: false}), async (req, res, next) => {
    try {
        const user = req.user._doc;

        if (!user) {
            const error = new Error('An Error occured')
            return next(error);
        }
        req.login(user, {session: false}, async (error) => {
            if (error) return next(error)

            //We don't want to store the sensitive information such as the
            //user password in the token so we pick only the email and id
            const body = {_id: user._id, email: user.email};

            //Sign the JWT token and populate the payload with the user email and id
            const token = jwt.sign({user: body}, 'top_secret');

            //Send back the token to the user

            return res.json({
                token: token,
                _id: body._id,
                email: body.email,
                profile_id: body.profile_id,
                user_type: body.user_type,
                avatar: body.avatar,
                name: body.name,
                team_id: body.team_id,
                team_avatar: body.team_avatar,
                team_acronym: body.team_acronym,
                team_name: body.team_name
            });

        });
    } catch (error) {
        return next(error);
    }
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                let error_message = user ? 'An Error occured' : 'No such user';
                const error = new Error(error_message)
                return next(error);
            }
            req.login(user, {session: false}, async (error) => {
                if (error) return next(error)

                // Obtaining more user information to keep in the JWT

                // TODO: Change this for better code - see what's written below.
                // Having a switch case for this means the architecture is somehow wrongly implemented.
                // Because this means we're going to have to come to this code scope whenever there's a new user type.
                // This also happens in other places in this project.

                user = JSON.parse(entities.decode(JSON.stringify(user)));

                switch (user.user_type){
                    case 'football_team' :
                        FootballTeam
                            .findOne({_id: user.profile_id})
                            .populate('current_season')
                            .exec(get_profile_info);
                        break;
                    default :
                        FootballUserInfo
                            .findOne({_id: user.profile_id})
                            .populate('current_season')
                            .exec(get_profile_info);

                }

                function get_profile_info(err, result) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting profile.',
                            error: err
                        });
                    }
                    if (!result) {
                        return res.status(404).json({
                            message: 'No such profile'
                        });
                    }

                    let profile_info = JSON.parse(entities.decode(JSON.stringify(result)));

                    // We don't want to store the sensitive information
                    // such as the password in the JWT
                    const body = {
                        _id: user._id,
                        email: user.email,
                        profile_id: user.profile_id,
                        user_type: user.user_type,
                        avatar: profile_info.current_season.personal_info.avatar,
                        name: profile_info.current_season.personal_info.name,
                        team_id: profile_info.current_season.team ? profile_info.current_season.team.id : 'n/a',
                        team_avatar: profile_info.current_season.team ? profile_info.current_season.team.avatar : 'n/a',
                        team_acronym: profile_info.current_season.team ? profile_info.current_season.team.acronym : 'n/a',
                        team_name: profile_info.current_season.team ? profile_info.current_season.team.name : 'n/a'
                    };

                    //Sign the JWT token and populate the payload with the user email, id and etc
                    const token = jwt.sign({user: body}, 'top_secret');
                    //Send back the token to the user
                    return res.json({
                        token: token,
                        _id: body._id,
                        email: body.email,
                        profile_id: body.profile_id,
                        user_type: body.user_type,
                        avatar: body.avatar,
                        name: body.name,
                        team_id: body.team_id,
                        team_avatar: body.team_avatar,
                        team_acronym: body.team_acronym,
                        team_name: body.team_name
                    });
                }
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.post('/:id/aggregate-profile', UserController.aggregate_profile);

module.exports = router;
