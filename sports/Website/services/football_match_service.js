const logger = require('../logging');
const _ = require('underscore');

const getMissingMatches = function(matchIds, cb) {
    return this.find({ "external_ids.zerozero":{ '$in': matchIds }}, function (err, matches) {
        if (matches && !err) {
            matches = _.difference(matchIds, matches.map(match => match.external_ids.zerozero))
        }
        cb(err, matches);
    });
}

const updateAndReturnByZeroZeroId = function(zerozero_id, match, cb) {
    const query = {"external_ids.zerozero": zerozero_id};

    this.findOneAndUpdate(query, match, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
}

const insertFutureMaches = function(matches, cb){
    this.insertMany(matches, cb);
}

module.exports = {
    getMissingMatches: getMissingMatches,
    updateAndReturnByZeroZeroId: updateAndReturnByZeroZeroId,
    insertFutureMaches: insertFutureMaches
}
