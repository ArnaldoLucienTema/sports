var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Service = {};

Service.createAchievement = function(achievement, cb) {
    this.create(achievement, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
}

Service.getAll = function (cb) {
    this.find({}, cb);
}

Service.addUserInfoToAchievement = function (user_info, achievement, cb) {
    const query = {
        _id: achievement._id,
        "bearers": { $ne: user_info._id }
    }

    const update = {
        $push: {
            "bearers": user_info._id
        }
    }

    this.findOneAndUpdate(query, update, cb);
}

module.exports = Service;