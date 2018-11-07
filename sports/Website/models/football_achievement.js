var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballAchievementSchema = new Schema({
	name : String,
    avatar: String,
	bearers: [{type: Schema.Types.ObjectId, ref: 'football_user_info'}],
	regex: String,
    regex_matches: Number
});

FootballAchievementSchema.statics = require('../services/football_achievement_service');

module.exports = mongoose.model('football_achievement', FootballAchievementSchema);
