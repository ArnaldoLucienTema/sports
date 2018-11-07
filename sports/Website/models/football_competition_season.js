var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballCompetitionSeasonSchema = new Schema({
    competition_id: {type: Schema.Types.ObjectId, ref: 'football_competition'},
    season_id: {type: Schema.Types.ObjectId, ref: 'football_season'},
    name: String,
    avatar: String,
    standings : [
        {
            id: {type: Schema.Types.ObjectId, ref: 'football_team_season'},
            team_id: {type: Schema.Types.ObjectId, ref: 'football_team'},
            name: String,
            avatar: String,
            points: {type: Number, default: 0},
            matches: {type: Number, default: 0},
            wins: {type: Number, default: 0},
            draws: {type: Number, default: 0},
            losses: {type: Number, default: 0},
            goals: {type: Number, default: 0},
            goals_taken: {type: Number, default: 0}
        }
    ],
    stats : [
        {
            id: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
            user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
            name: String,
            avatar: String,
            nationality: String,
            positions: [String],
            goals: {type: Number, default: 0},
            assists: {type: Number, default: 0},
            minutes: {type: Number, default: 0},
            wins: {type: Number, default: 0},
            draws: {type: Number, default: 0},
            losses: {type: Number, default: 0},
            yellow_cards: {type: Number, default: 0},
            red_cards: {type: Number, default: 0}
        }
    ],
    matches: [{
        id: {type: Schema.Types.ObjectId, ref: 'football_match'},
        date: Date,
        competition_season:{
            id: {type: Schema.Types.ObjectId, ref: 'football_competition_season'},
            competition_id: {type: Schema.Types.ObjectId, ref: 'football_competition'},
            name: String,
            avatar: String
        },
        home_team: {
            id: {type: Schema.Types.ObjectId, ref: 'football_team_season'},
            team_id: {type: Schema.Types.ObjectId, ref: 'football_team'},
            name: String,
            avatar: String,
            goals: Number
        },
        away_team: {
            id: {type: Schema.Types.ObjectId, ref: 'football_team_season'},
            team_id: {type: Schema.Types.ObjectId, ref: 'football_team'},
            name: String,
            avatar: String,
            goals: Number
        }
    }],
    media: [
        {
            title: {type: String, required: true},
            author: String,
            date: Date,
            image: String,
            text: {type: String, required: true},
            references: {
                leagues: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'football_competition'}
                }],
                team: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'football_team'}
                }],
                user: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'football_user_info'}
                }],
            }
        }
    ],
    external_ids: {
        zerozero: {type: Number, required: true, unique: true, index: true},
    }
});

FootballCompetitionSeasonSchema.statics = require('../services/football_competition_season_service');

module.exports = mongoose.model('football_competition_season', FootballCompetitionSeasonSchema);
