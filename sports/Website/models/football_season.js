var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballSeasonSchema = new Schema({
	name : String,
    external_ids: {
        zerozero: Number,
    }
});

FootballSeasonSchema.statics = require('../services/football_season_service');

module.exports = mongoose.model('football_season', FootballSeasonSchema);
