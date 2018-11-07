var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const addTeamToCompetition = function(id, team_season, cb) {
    query = {
        "_id": id,
        "standings.id": { $ne: team_season._id }
    };

    update = {
        $push: { "standings": {
                id: team_season._id,
                team_id: team_season.team_id,
                name: team_season.name,
                avatar: team_season.avatar
            }
        }
    }

    this.findOneAndUpdate(query, update, { setDefaultsOnInsert: true }, cb);
};

const addUserInfoToCompetition = function(id, user_info_season, cb) {
    query = {
        "_id": id,
        "stats.id": { $ne: user_info_season._id }
    };

    update = {
        $push: { "stats": {
                id: user_info_season._id,
                user_info_id: user_info_season.user_info_id,
                name: user_info_season.personal_info.name,
                avatar: user_info_season.personal_info.avatar,
                nationality: user_info_season.personal_info.nationality,
                positions: user_info_season.personal_info.positions
            }
        }
    }

    this.findOneAndUpdate(query, update, { setDefaultsOnInsert: true }, cb);
};

const updateCompetitionStandingsAndStats = function(match, nestedMatch, cb){
    const home_goals = match.home_team.goals.length;
    const away_goals = match.away_team.goals.length;

    let operations = [];

    //standings

    operations.push({
        updateOne: {
            filter: {
                "_id": match.competition_season.id,
                "standings.id": match.home_team.id,
                "matches.id": { $ne: match._id }
            },
            update: {
                $inc : {
                    "standings.$.points" : home_goals > away_goals ? 3 : (home_goals == away_goals ? 1 : 0) ,
                    "standings.$.matches" : 1,
                    "standings.$.wins" : home_goals > away_goals ? 1 : 0,
                    "standings.$.draws" : home_goals == away_goals ? 1 : 0,
                    "standings.$.losses" : home_goals < away_goals ? 1 : 0,
                    "standings.$.goals" : home_goals,
                    "standings.$.goals_taken" : away_goals
                }
            }
        }
    });

    operations.push({
        updateOne: {
            filter: {
                "_id": match.competition_season.id,
                "standings.id": match.away_team.id,
                "matches.id": { $ne: match._id }
            },
            update: {
                $inc : {
                    "standings.$.points" : away_goals > home_goals ? 3 : (home_goals == away_goals ? 1 : 0) ,
                    "standings.$.matches" : 1,
                    "standings.$.wins" : home_goals < away_goals ? 1 : 0,
                    "standings.$.draws" : home_goals == away_goals ? 1 : 0,
                    "standings.$.losses" : home_goals > away_goals ? 1 : 0,
                    "standings.$.goals" : away_goals,
                    "standings.$.goals_taken" : home_goals
                }
            }
        }
    });

    //stats

    match.home_team.main_lineup.forEach(function(player){
        operations.push({
            updateOne: {
                filter: {
                    "_id": match.competition_season.id,
                    "stats.id": player.id,
                    "matches.id": { $ne: match._id }
                },
                update: {
                    $inc : {
                        "stats.$.goals": player.goals.length,
                        "stats.$.assists": player.assists.length,
                        "stats.$.minutes": player.minutes_played,
                        "stats.$.wins": home_goals > away_goals ? 1 : 0,
                        "stats.$.draws" : home_goals == away_goals ? 1 : 0,
                        "stats.$.losses" : home_goals < away_goals ? 1 : 0,
                        "stats.$.yellow_cards": player.yellow_cards.length,
                        "stats.$.red_cards": player.red_cards.length
                    }
                }
            }
        })
    });

    match.away_team.main_lineup.forEach(function(player){
        operations.push({
            updateOne: {
                filter: {
                    "_id": match.competition_season.id,
                    "stats.id": player.id,
                    "matches.id": { $ne: match._id }
                },
                update: {
                    $inc : {
                        "stats.$.goals": player.goals.length,
                        "stats.$.assists": player.assists.length,
                        "stats.$.minutes": player.minutes_played,
                        "stats.$.wins": home_goals < away_goals ? 1 : 0,
                        "stats.$.draws" : home_goals == away_goals ? 1 : 0,
                        "stats.$.losses" : home_goals > away_goals ? 1 : 0,
                        "stats.$.yellow_cards": player.yellow_cards.length,
                        "stats.$.red_cards": player.red_cards.length
                    }
                }
            }
        })
    });

    match.home_team.reserves.forEach(function(player){
        operations.push({
            updateOne: {
                filter: {
                    "_id": match.competition_season.id,
                    "stats.id": player.id,
                    "matches.id": { $ne: match._id }
                },
                update: {
                    $inc : {
                        "stats.$.goals": player.goals.length,
                        "stats.$.assists": player.assists.length,
                        "stats.$.minutes": player.minutes_played,
                        "stats.$.wins": home_goals > away_goals ? 1 : 0,
                        "stats.$.draws" : home_goals == away_goals ? 1 : 0,
                        "stats.$.losses" : home_goals < away_goals ? 1 : 0,
                        "stats.$.yellow_cards": player.yellow_cards.length,
                        "stats.$.red_cards": player.red_cards.length
                    }
                }
            }
        })
    });

    match.away_team.reserves.forEach(function(player){
        operations.push({
            updateOne: {
                filter: {
                    "_id": match.competition_season.id,
                    "stats.id": player.id,
                    "matches.id": { $ne: match._id }
                },
                update: {
                    $inc : {
                        "stats.$.goals": player.goals.length,
                        "stats.$.assists": player.assists.length,
                        "stats.$.minutes": player.minutes_played,
                        "stats.$.wins": home_goals < away_goals ? 1 : 0,
                        "stats.$.draws" : home_goals == away_goals ? 1 : 0,
                        "stats.$.losses" : home_goals > away_goals ? 1 : 0,
                        "stats.$.yellow_cards": player.yellow_cards.length,
                        "stats.$.red_cards": player.red_cards.length
                    }
                }
            }
        })
    });

    //sort standings and match

    operations.push({
        updateOne: {
            filter: {
                "_id": match.competition_season.id,
            },
            update: {
                $push: {
                    standings: {
                        $each: [],
                        $sort: { points: 1 }
                    },
                    matches: nestedMatch
                }
            }
        }
    })

    this.bulkWrite(operations, {}, cb);
};

const updateAndReturnByZeroZeroId = function(zerozero_id, competition_season, cb) {
    const query = {"external_ids.zerozero": zerozero_id};

    this.findOneAndUpdate(query, competition_season, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
}

const getById = function(id, cb) {
    this.findById(id, cb);
}

module.exports = {
    addTeamToCompetition: addTeamToCompetition,
    addUserInfoToCompetition: addUserInfoToCompetition,
    updateAndReturnByZeroZeroId: updateAndReturnByZeroZeroId,
    updateCompetitionStandingsAndStats:updateCompetitionStandingsAndStats,
    getById: getById
}