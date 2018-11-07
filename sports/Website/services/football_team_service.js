const logger = require('../logging');
const _ = require('underscore');

const updateAndReturnByZeroZeroId = function(zerozero_id, user_info, cb) {
    const query = {"external_ids.zerozero": zerozero_id};

    this.findOneAndUpdate(query, user_info, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
}

const updateCurrentSeasons = function (seasons, cb) {
    let operations = [];

    seasons.forEach(function(season){
        let team_season = season._doc;

        operations.push({
            updateOne: {
                filter: {
                    "_id": team_season.team_id
                },
                update: {
                    $set : {
                        "current_season": team_season._id
                    }
                }
            }
        });
    });

    this.bulkWrite(operations, {}, cb);
}

module.exports = {
    updateAndReturnByZeroZeroId: updateAndReturnByZeroZeroId,
    updateCurrentSeasons: updateCurrentSeasons
}


