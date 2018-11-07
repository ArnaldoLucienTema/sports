let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

/**
 *
 * Admiting that only football users can receive recommendation now.
 *
 * */

let FootballRecommendationSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
    author: {
        author_type: String,
        name: String,
        relationship: String,
        id: String, // There's no Schema reference because it can be any type of user
        avatar: String,
        team: {
            id: {type: Schema.Types.ObjectId, ref: 'football_team'},
            acronym: String,
            avatar: String,
            name: String,
        },
    },
    text: String
});

FootballRecommendationSchema.statics = require('../services/football_recommendation_service');

module.exports = mongoose.model('football_recommendation', FootballRecommendationSchema);
