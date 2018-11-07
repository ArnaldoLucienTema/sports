var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballMatchSchema = new Schema({
    played: {type: Boolean, required: true, index: true},
	external_ids: {
		zerozero: Number
	},
	date : {type: Date, required: true},
	duration : Number,
	stadium: String,
	referee: String,
    competition_season: {
		name: String,
        avatar: String,
		id: {type: Schema.Types.ObjectId, ref: 'football_competition_season'},
        competition_id: {type: Schema.Types.ObjectId, ref: 'football_competition'},
        phase: String
	},
	home_team : {
        id: {type: Schema.Types.ObjectId, ref: 'football_team_season'},
        team_id: {type: Schema.Types.ObjectId, ref: 'football_team'},
        name: String,
        avatar: String,
        goals: [String],
		main_lineup:[
			{
                name: String,
                avatar: String,
                positions: [String],
                nationality: String,
                user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
                id: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
                number: String,
                goals: [Number],
                assists: [Number],
                yellow_cards: [Number],
                red_cards: [Number],
                minutes_played: {type: Number, default: 0},
                go_in: [Number],
                go_out: [Number],
                achievements: [
                    {
                        id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
                        name: String,
                        avatar: String
                    }
                ]
			}
		],
		reserves:[
            {
                name: String,
                avatar: String,
                positions: [String],
                nationality: String,
                user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
                id: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
                number: String,
                goals: [Number],
                assists: [Number],
                yellow_cards: [Number],
                red_cards: [Number],
                minutes_played: {type: Number, default: 0},
                go_in: [Number],
                go_out: [Number],
                achievements: [
                    {
                        id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
                        name: String,
                        avatar: String
                    }
                ]
            }
		],
		staff:[
            {
                id: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
                user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
                name: String,
                avatar: String,
                nationality: String,
                external_ids: {
                    zerozero: Number
                },
                achievements: [
                    {
                        id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
                        name: String,
                        avatar: String
                    }
                ]
            }
        ],
        achievements: [
            {
                id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
                name: String,
                avatar: String
            }
        ]
	},
	away_team : {
        id: {type: Schema.Types.ObjectId, ref: 'football_team_season'},
        team_id: {type: Schema.Types.ObjectId, ref: 'football_team'},
        name: String,
        avatar: String,
        goals: [String],
        main_lineup:[
            {
                name: String,
                avatar: String,
                positions: [String],
                nationality: String,
                user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
                id: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
                number: String,
                goals: [Number],
                assists: [Number],
                yellow_cards: [Number],
                red_cards: [Number],
                minutes_played: {type: Number, default: 0},
                go_in: [Number],
                go_out: [Number],
                achievements: [
                    {
                        id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
                        name: String,
                        avatar: String
                    }
                ]
            }
        ],
        reserves:[
            {
                name: String,
                avatar: String,
                positions: [String],
                nationality: String,
                user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
                id: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
                number: String,
                goals: [Number],
                assists: [Number],
                yellow_cards: [Number],
                red_cards: [Number],
                minutes_played: {type: Number, default: 0},
                go_in: [Number],
                go_out: [Number],
                achievements: [
                    {
                        id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
                        name: String,
                        avatar: String
                    }
                ]
            }
        ],
        staff:[
            {
                id: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
                user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
                name: String,
                avatar: String,
                nationality: String,
                external_ids: {
                    zerozero: Number
                },
                achievements: [
                    {
                        id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
                        name: String,
                        avatar: String
                    }
                ]
            }
        ],
        achievements: [
            {
                id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
                name: String,
                avatar: String
            }
        ]
    }
});

FootballMatchSchema.statics = require('../services/football_match_service');

module.exports = mongoose.model('football_match', FootballMatchSchema);
