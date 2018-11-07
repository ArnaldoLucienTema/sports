const logger = require('../logging');
const _ = require('underscore');

const getSeasonByName = function(name, cb) {
    const query = {
        name: name
    };

    this.findOneAndUpdate(query, query, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
};

module.exports = {
    getSeasonByName: getSeasonByName
}
