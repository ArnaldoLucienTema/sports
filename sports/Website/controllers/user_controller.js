var UserModel = require('../models/football_user.js');
var FootballUserInfo = require('../models/football_user_info.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jwt = require('jsonwebtoken');


/**
 * user_controller.js
 *
 * @description :: Server-side logic for managing Users.
 */
let Service = {};

/**
 *
 * @param req
 * @param res
 * @returns {*}
 */
Service.signup = function (req, res) {
    return res.json({message: "Signed UP!"});
};

/**
 * UserController.list()
 */
Service.list = function (req, res) {
    UserModel.find(function (err, Users) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting User.',
                error: err
            });
        }
        return res.json(Users);
    });
};

/**
 * UserController.show()
 */
Service.show = function (req, res) {
    var id = req.params.id;
    UserModel.findOne({_id: id}, function (err, User) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting User.',
                error: err
            });
        }
        if (!User) {
            return res.status(404).json({
                message: 'No such User'
            });
        }
        return res.json(User);
    });
};

/**
 * UserController.create()
 */
Service.create = function (req, res) {
    var User = new UserModel({
        email: req.body.email,
        password: req.body.password,
        last_login: req.body.last_login,
        subscription_expiration: req.body.subscription_expiration,
        teams: req.body.teams,
        player: req.body.player,
        coach: req.body.coach
    });

    User.save(function (err, User) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating User',
                error: err
            });
        }
        return res.status(201).json(User);
    });
};

/**
 * UserController.update()
 */
Service.update = function (req, res) {
    var id = req.params.id;
    UserModel.findOne({_id: id}, function (err, User) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting User',
                error: err
            });
        }
        if (!User) {
            return res.status(404).json({
                message: 'No such User'
            });
        }

        // TODO : Careful! This is obsolete, the user has no longer this fields

        User.email = req.body.email ? req.body.email : User.email;
        User.password = req.body.password ? req.body.password : User.password;
        User.last_login = req.body.last_login ? req.body.last_login : User.last_login;
        User.subscription_expiration = req.body.subscription_expiration ? req.body.subscription_expiration : User.subscription_expiration;
        User.teams = req.body.teams ? req.body.teams : User.teams;
        User.player = req.body.player ? req.body.player : User.player;
        User.coach = req.body.coach ? req.body.coach : User.coach;

        User.save(function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating User.',
                    error: err
                });
            }

            return res.json(User);
        });
    });
};

/**
 * UserController.remove()
 */
Service.remove = function (req, res) {
    var id = req.params.id;
    UserModel.findByIdAndRemove(id, function (err, User) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the User.',
                error: err
            });
        }
        return res.status(204).json();
    });
};

/**
 * UserController.remove()
 */
Service.aggregate_profile = function (req, res) {
    let id = req.params.id;
    let profile_id = req.body.id;
    let user_session = {}

    FootballUserInfo.findOne({_id: profile_id})
        .populate('current_season')
        .exec(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }

            user_info = JSON.parse(entities.decode(JSON.stringify(user_info)));


            UserModel.findOne({_id: id})
                .exec(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting user',
                            error: err
                        });
                    }
                    if (!user) {
                        return res.status(404).json({
                            message: 'No such user'
                        });
                    }

                    // Storing the aggregated profile to the current user
                    user.profile_id = user_info._id;
                    user.user_type = user_info.current_season.team ? 'football_user_info' : 'football_team';


                    // Sending the user information based on the user aggregated profile
                    // This information will be used as session user in the front end
                    user_session.profile_id = user_info._id;
                    user_session.user_type = user_info.current_season.team ? 'football_user_info' : 'football_team';
                    user_session.avatar = user_info.current_season.personal_info.avatar;
                    user_session.name = user_info.current_season.personal_info.name;
                    user_session.team_avatar = user_info.current_season.team ? user_info.current_season.team.avatar : 'n/a';
                    user_session.team_id = user_info.current_season.team ? user_info.current_season.team._id : 'n/a';
                    user_session.team_acronym = user_info.current_season.team ? user_info.current_season.team.acronym : 'n/a';
                    user_session.team_name = user_info.current_season.team ? user_info.current_season.team.name : 'n/a';

                    user_session.token = jwt.sign({user: user_session}, 'top_secret');

                    user.save(function (err, saved_user) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when updating user.',
                                error: err
                            });
                        }

                        // Sending the user information merged with the information from its aggregated user_info
                        return res.json(user_session);
                    });
                });

        });


};


module.exports = Service;