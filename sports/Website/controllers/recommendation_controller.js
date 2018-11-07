var FootballRecommendation = require('../models/football_recommendation.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

let Service = {};

// Recommendation DB Interactions

Service.search = function (req, res) {
    let select = {
        "_id": 1,
        "author": 1,
        "text": 1
    };

    let query = {};

    req.body.forEach(function (filter) {
        query[filter.search_item] = {};
        query[filter.search_item][filter.selected_filter] = filter.selected_value;

        if (filter.selected_filter == '$regex') {
            query[filter.search_item]['$options'] = 'i';
        }
    });

    FootballRecommendation
        .find(query)
        .select(select)
        .populate('author')
        .exec(function (err, recommendations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting recommendations.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(recommendations))));
        });
};

Service.list = function (req, res) {
    FootballRecommendation
        .find()
        .populate('author')
        .limit(5)
        .exec(function (err, recommendations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting recommendations.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(recommendations))));
        });
};

Service.show = function (req, res) {
    var id = req.params.id;
    FootballRecommendation
        .findOne({_id: id})
        .populate('author')
        .exec(function (err, recommendations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting the requested recommendation.',
                    error: err
                });
            }
            if (!recommendations) {
                return res.status(404).json({
                    message: 'No such recommendation'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(recommendations))));
        });
};

Service.create = function (req, res) {
    var recommendation = new FootballRecommendation(req.body);

    recommendation.save(function (err, created_recommendation) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating recommendation',
                error: err
            });
        }
        return res.status(201).json(created_recommendation);
    });
};

Service.update = function (req, res) {
    let id = req.params.id || req.body._id;
    FootballRecommendation.findOne({_id: id}, function (err, recommendation) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting recommendation',
                error: err
            });
        }
        if (!recommendation) {
            return res.status(404).json({
                message: 'No such recommendation'
            });
        }

        recommendation.user_id = req.body.user_id ? req.body.user_id : recommendation.user_id;
        recommendation.text = req.body.text ? req.body.text : recommendation.text;
        recommendation.author.author_type = req.body.author.author_type ? req.body.author.author_type : recommendation.author.author_type;
        recommendation.author.name = req.body.author.name ? req.body.author.name : recommendation.author.name;
        recommendation.author.relationship = req.body.author.relationship ? req.body.author.relationship : recommendation.author.relationship;
        recommendation.author.id = req.body.author.id ? req.body.author.id : recommendation.author.id;
        recommendation.author.avatar = req.body.author.avatar ? req.body.author.avatar : recommendation.author.avatar;
        recommendation.author.team.id = req.body.author.team.id ? req.body.author.team.id : recommendation.author.team.id;
        recommendation.author.team.acronym = req.body.author.team.acronym ? req.body.author.team.acronym : recommendation.author.team.acronym;
        recommendation.author.team.avatar = req.body.author.team.avatar ? req.body.author.team.avatar : recommendation.author.team.avatar;
        recommendation.author.team.name = req.body.author.team.name ? req.body.author.team.name : recommendation.author.team.name;

        recommendation.save(function (err, updated_recommendation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating recommendation.',
                    error: err
                });
            }

            return res.json(updated_recommendation);
        });
    });
};

Service.remove = function (req, res) {
    var id = req.params.id || req.body._id;
    FootballRecommendation.findByIdAndRemove(id, function (err, recommendation) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the recommendation.',
                error: err
            });
        }
        return res.status(204).json();
    });
};

module.exports = Service;