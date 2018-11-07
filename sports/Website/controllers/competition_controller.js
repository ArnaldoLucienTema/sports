var CompetitionModel = require('../models/football_competition.js');
var CompetitionSeasonModel = require('../models/football_competition_season');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

/**
 * competition_controller.js
 *
 * @description :: Server-side logic for managing Competitions.
 */
module.exports = {

    /**
     * CompetitionController.list()
     */
    list: function (req, res) {
        CompetitionSeasonModel
            .find()
            .select({
                standings: 0,
                matches: 0,
                stats: 0
            })
            .populate('current_season')
            .populate('previous_seasons', 'stats')
            .exec( function (err, Competitions) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Competition.',
                        error: err
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(Competitions))));
            });
    },

    /**
     * CompetitionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        CompetitionSeasonModel.findOne({_id: id}, function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Competition.',
                    error: err
                });
            }
            if (!Competition) {
                return res.status(404).json({
                    message: 'No such Competition'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(Competition))));
        });
    },

    /**
     * CompetitionController.create()
     */
    create: function (req, res) {
        var object = {};

        Object.keys(CompetitionModel.schema.obj).forEach(function(key) {
            object[key] = req.body[key];
        });

        var Competition = new CompetitionModel(object);

        Competition.save(function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Competition',
                    error: err
                });
            }
            return res.status(201).json(Competition);
        });
    },

    /**
     * CompetitionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CompetitionSeasonModel.findOne({_id: id}, function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Competition',
                    error: err
                });
            }
            if (!Competition) {
                return res.status(404).json({
                    message: 'No such Competition'
                });
            }

            Object.keys(CompetitionModel.schema.obj).forEach(function(key) {
                Competition[key] = req.body[key] ? req.body[key] : Competition[key];
            });
			
            Competition.save(function (err, Competition) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Competition.',
                        error: err
                    });
                }

                return res.json(Competition);
            });
        });
    },

    /**
     * CompetitionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        CompetitionSeasonModel.findByIdAndRemove(id, function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Competition.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    teams: function (req, res) {
        var id = req.params.id;
        CompetitionSeasonModel
            .findOne({_id: id})
            .exec(function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Competition.',
                    error: err
                });
            }
            if (!Competition) {
                return res.status(404).json({
                    message: 'No such Competition'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(Competition.standings))));
        });
    }
};
