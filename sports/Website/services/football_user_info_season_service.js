const logger = require('../logging');
const _ = require('underscore');

const addCompetitionToUserInfo = function (id, competition_season, cb) {
    let query = {
        _id: id,
        "stats.id": {$ne: competition_season._id}
    };

    let update = {
        $addToSet: {
            "stats": {
                id: competition_season._id,
                competition_id: competition_season.competition_id,
                season_id: competition_season.season_id,
                name: competition_season.name,
                avatar: competition_season.avatar,
            }
        }
    };

    this.findOneAndUpdate(query, update, {setDefaultsOnInsert: true}, cb);
};

const updatePersonalInfo = function (id, personal_info, cb) {
    let query = {_id: id};

    let update = {
        $set: {
            personal_info: personal_info
        }
    };

    this.findOneAndUpdate(query, update, {setDefaultsOnInsert: true}, cb);
};

const getMatchUserInfosByZeroZeroId = function (season_id, homeTeam, awayTeam, cb) {
    let query = [
        {
            $facet: {
                home_team: [
                    {
                        $match: {
                            "season_id": season_id,
                            "external_ids.zerozero": {"$in": homeTeam.main_lineup}
                        }
                    }
                ],
                home_team_reserves: [
                    {
                        $match: {
                            "season_id": season_id,
                            "external_ids.zerozero": {"$in": homeTeam.reserves}
                        }
                    }
                ],
                home_team_staff: [
                    {
                        $match: {
                            "season_id": season_id,
                            "external_ids.zerozero": {"$in": homeTeam.staff}
                        }
                    }
                ],
                away_team: [
                    {
                        $match: {
                            "season_id": season_id,
                            "external_ids.zerozero": {"$in": awayTeam.main_lineup}
                        }
                    }
                ],
                away_team_reserves: [
                    {
                        $match: {
                            "season_id": season_id,
                            "external_ids.zerozero": {"$in": awayTeam.reserves}
                        }
                    }
                ],
                away_team_staff: [
                    {
                        $match: {
                            "season_id": season_id,
                            "external_ids.zerozero": {"$in": awayTeam.staff}
                        }
                    }
                ]
            }
        }
    ];

    this.aggregate(query, cb)
};

const updateAndReturnByZeroZeroId = function (zerozero_id, season_id, user_info_season, cb) {
    const query = {
        "external_ids.zerozero": zerozero_id,
        "season_id": season_id
    };

    this.findOneAndUpdate(query, user_info_season, {upsert: true, new: true, setDefaultsOnInsert: true}, cb);
};

const updateUserInfosStats = function (match, nestedMatch, cb) {
    const home_goals = match.home_team.goals.length;
    const away_goals = match.away_team.goals.length;

    let operations = [];

    match.home_team.main_lineup.forEach(function (player) {
        operations.push({
            updateOne: {
                filter: {
                    "_id": player.id,
                    "stats.id": match.competition_season.id,
                    "matches.id": {$ne: match._id}
                },
                update: {
                    $inc: {
                        "stats.$.goals": player.goals.length,
                        "stats.$.assists": player.assists.length,
                        "stats.$.minutes_played": player.minutes_played,
                        "stats.$.games": 1,
                        "stats.$.wins": home_goals > away_goals ? 1 : 0,
                        "stats.$.draws": home_goals == away_goals ? 1 : 0,
                        "stats.$.losses": home_goals < away_goals ? 1 : 0,
                        "stats.$.yellow_cards": player.yellow_cards.length,
                        "stats.$.red_cards": player.red_cards.length
                    },
                    $push: {
                        matches: nestedMatch
                    }
                }
            }
        })
    });

    match.away_team.main_lineup.forEach(function (player) {
        operations.push({
            updateOne: {
                filter: {
                    "_id": player.id,
                    "stats.id": match.competition_season.id,
                    "matches.id": {$ne: match._id}
                },
                update: {
                    $inc: {
                        "stats.$.goals": player.goals.length,
                        "stats.$.assists": player.assists.length,
                        "stats.$.minutes_played": player.minutes_played,
                        "stats.$.games": 1,
                        "stats.$.wins": home_goals < away_goals ? 1 : 0,
                        "stats.$.draws": home_goals == away_goals ? 1 : 0,
                        "stats.$.losses": home_goals > away_goals ? 1 : 0,
                        "stats.$.yellow_cards": player.yellow_cards.length,
                        "stats.$.red_cards": player.red_cards.length
                    },
                    $push: {
                        matches: nestedMatch
                    }
                }
            }
        })
    });

    match.home_team.reserves.forEach(function (player) {
        operations.push({
            updateOne: {
                filter: {
                    "_id": player.id,
                    "stats.id": match.competition_season.id,
                    "matches.id": {$ne: match._id}
                },
                update: {
                    $inc: {
                        "stats.$.goals": player.goals.length,
                        "stats.$.assists": player.assists.length,
                        "stats.$.minutes_played": player.minutes_played,
                        "stats.$.games": 1,
                        "stats.$.wins": home_goals > away_goals ? 1 : 0,
                        "stats.$.draws": home_goals == away_goals ? 1 : 0,
                        "stats.$.losses": home_goals < away_goals ? 1 : 0,
                        "stats.$.yellow_cards": player.yellow_cards.length,
                        "stats.$.red_cards": player.red_cards.length
                    },
                    $push: {
                        matches: nestedMatch
                    }
                }
            }
        })
    });

    match.away_team.reserves.forEach(function (player) {
        operations.push({
            updateOne: {
                filter: {
                    "_id": player.id,
                    "stats.id": match.competition_season.id,
                    "matches.id": {$ne: match._id}
                },
                update: {
                    $inc: {
                        "stats.$.goals": player.goals.length,
                        "stats.$.assists": player.assists.length,
                        "stats.$.minutes_played": player.minutes_played,
                        "stats.$.games": 1,
                        "stats.$.wins": home_goals < away_goals ? 1 : 0,
                        "stats.$.draws": home_goals == away_goals ? 1 : 0,
                        "stats.$.losses": home_goals > away_goals ? 1 : 0,
                        "stats.$.yellow_cards": player.yellow_cards.length,
                        "stats.$.red_cards": player.red_cards.length
                    },
                    $push: {
                        matches: nestedMatch
                    }
                }
            }
        })
    });

    this.bulkWrite(operations, {}, cb);
};

const getByTeamSeasonId = function (id, cb) {
    const query = {
        "team.id": id
    }

    this.find(query, cb);
};

module.exports = {
    addCompetitionToUserInfo: addCompetitionToUserInfo,
    getMatchUserInfosByZeroZeroId: getMatchUserInfosByZeroZeroId,
    updateAndReturnByZeroZeroId: updateAndReturnByZeroZeroId,
    updateUserInfosStats: updateUserInfosStats,
    getByTeamSeasonId: getByTeamSeasonId,
    updatePersonalInfo: updatePersonalInfo
}
