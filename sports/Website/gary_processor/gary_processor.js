const schedule = require('node-schedule');
const logger = require('../logging');
const footballAchievement = require('../models/football_achievement');
const footballUserInfo = require('../models/football_user_info');
const achievementsMailer = require('../mailers/achievements_mailer');
const achievementsNotifications = require('../services/notifications/notifications_service');

let Service = {};

let achievements = [];
let last_run = new Date(0);

Service.updateRecommendations = function() {
    footballAchievement.getAll(function (err, result) {
        if (err) {
            logger.error(err);
        }
        else {
            achievements = result;
        }
    })
}

Service.rewardAchievement = function(user_info, achievement, cb) {
    footballAchievement.addUserInfoToAchievement(user_info, achievement, function(err, result) {
        if (err) {
            logger.error(err);
        }
        else {
            footballUserInfo.addAchievementToUserInfo(achievement, user_info, cb)
        }
    })
}

logger.info('==== Launching scheduler ====');

Service.updateRecommendations();

let test = true;

let regexScheduler = schedule.scheduleJob('*/20 * * * * *', function(fireDate){
    logger.info('This job was set to run at ' + fireDate + ', and actually ran at ' + new Date());

    footballUserInfo.getUserInfosByUpdatedAt(last_run, function (err, result) {
        if (err) {
            logger.error(err);
        }
        else {
            test = true;
            result.forEach(function(user_info) {
                achievements.forEach(function (achievement) {
                    let regex = new RegExp(achievement.regex, "g");
                    const matches = ((user_info.actions_regex || '').match(regex) || []).length;
                    if(matches >= achievement.regex_matches){
                        //logger.info("Achievement " + achievement.name + " rewarded to: " + user_info._id );
                        Service.rewardAchievement(user_info, achievement, function(err, result) {
                            if (err) {
                                logger.error(err);
                            }
                            else {
                                if (result) {
                                    logger.info("Achievement " + achievement.name + " rewarded to: " + user_info._id + ", Success!");
                                    achievementsMailer.ownAchievementMail(user_info, achievement);
                                    achievementsNotifications.newAchievement(user_info, achievement);
                                }
                                else {
                                    logger.info("Achievement already rewarded!");
                                }
                            }
                        });
                    }
                })
            });
        }
    })
});

module.exports = Service;