var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballCompetitionSchema = new Schema({
	name : String,
	avatar: String,
	current_season: {type: Schema.Types.ObjectId, ref: 'football_competition_season'},
	previous_seasons: [{type: Schema.Types.ObjectId, ref: 'football_competition_season'}],
    external_ids: {
        zerozero: {type: Number, required: true, unique: true, index: true},
    }
});

FootballCompetitionSchema.statics = require('../services/football_competition_service');

module.exports = mongoose.model('football_competition', FootballCompetitionSchema);
