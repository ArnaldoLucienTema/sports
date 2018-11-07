const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
const format = require("string-template");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const footballUserInfo = require('../../../models/football_user_info');
const footballUserInfoSeason = require('../../../models/football_user_info_season');
const footballCompetitionSeason = require('../../../models/football_competition_season');
const footballMatch = require('../../../models/football_match');
const footballTeamSeason = require('../../../models/football_team_season');

function initializeMatchModel(match, res, done, cb){

    //Competition

    match.competition_season.phase = res.$("#matchedition .information span")[0] ?
        res.$(res.$("#matchedition .information span")[0]).html():
        '';

    //Misc

    match.referee = res.$(".frame .entity .text a") ?
        res.$(".frame .entity .text a").html():
        '';

    match.stadium = res.$("#stadium .name a") ?
        res.$("#stadium .name a").html() :
        '';

    //Duration (went to overtime?)

    match.duration = res.$(".extratime").length == 0 ?
        90 :
        120;

    // Teams

    let homeZeroZeroId = res.$("#page_header .info .content .home .team a").length > 0 ?
        res.$("#page_header .info .content .home .team a").attr('href').match(/\d+/g)[0] :
        0;

    let awayZeroZeroId = res.$("#page_header .info .content .away .team a").length > 0 ?
        res.$("#page_header .info .content .away .team a").attr('href').match(/\d+/g)[0] :
        0;

    res.$(".info .home .scorers .time").each(function(){
        var number = res.$(this).html().trim();
        if(number.split(" ").length > 0){
            match.home_team.goals = match.home_team.goals.concat(number.split(" "));
        }
        else{
            match.home_team.goals = match.home_team.goals.push(number);
        }
    });

    res.$(".info .away .scorers .time").each(function(){
        var number = res.$(this).html().trim();
        if(number.split(" ").length > 0){
            match.away_team.goals = match.away_team.goals.concat(number.split(" "));
        }
        else{
            match.away_team.goals = match.away_team.goals.push(number);
        }
    });

    footballTeamSeason.getMatchTeamsByZeroZeroId(res.options.competition_season.season_id, homeZeroZeroId, awayZeroZeroId, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done)
        }
        else {
            logger.info("Successfully fetched match teams", result);

            let home_team = result[0].home_team[0];
            let away_team = result[0].away_team[0];

            if(home_team){
                match.home_team.id = home_team._id;
                match.home_team.team_id = home_team.team_id;
                match.home_team.name = home_team.name;
                match.home_team.avatar = home_team.avatar;
            }

            if(away_team){
                match.away_team.id = away_team._id;
                match.away_team.team_id = away_team.team_id;
                match.away_team.name = away_team.name;
                match.away_team.avatar = away_team.avatar;
            }

            res.options.home_team = home_team;
            res.options.away_team = away_team;

            cb(match, res, done);
        }
    })
}

function _getEventsTimes(times){
    let result = [];

    let parsedTimes = times.html().match(/(\d+\+*\d*)/g);

    if(parsedTimes != null) {
        parsedTimes.forEach(function (time) {
            if (time.includes('+')) {
                let overtime = time.split('+');
                result.push((+overtime[0]) + (+overtime[1] / 10));
            }
            else {
                result.push(+time);
            }
        });
    }
    else{
        times.html().split(' ').forEach(function() {
            result.push('-1');
        });
    }

    return result;
}

function _processPlayerEvents(match, res, player, starter, ids, team){
        ids.push(+res.$(player).find(".name .text a").attr('href').match(/\d+/g)[0]);

        const eventsLabels = res.$(player).find(".events span");
        const eventsTimes = res.$(player).find(".events div");

        let goIn = starter ? 0 : match.duration;
        let goOut = match.duration;

        let playerStats = {
            number: +res.$(player).find(".number").html(),
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 0,
            go_in:[],
            go_out:[]
        };

        /*

        Events Mapping:

            Goal ->  Q
            Assist -> B

            Red Cards -> R title="Vermelhos"
            Yellow Cards -> R title="Amarelos"
            Double Yellow -> S

            Defend Penalti -> C
            Miss Penalti -> A

            Leave match -> 8
            Enter match -> 7

         */

        for(let i = 0; i < eventsLabels.length ; i++){
            const label = res.$(eventsLabels[i]);
            const times = res.$(eventsTimes[i]);

            switch(label.html()) {
                case "Q":
                    playerStats.goals = _getEventsTimes(times);
                    break;
                case "B":
                    playerStats.assists = _getEventsTimes(times);
                    break;
                case "R":
                    if(label.attr("title") == "Vermelhos") {
                        playerStats.red_cards = _getEventsTimes(times);
                    }
                    else if(label.attr("title") == "Amarelos") {
                        playerStats.yellow_cards = _getEventsTimes(times);
                    }
                    break;
                case "S":
                    playerStats.yellow_cards = playerStats.yellow_cards.concat(_getEventsTimes(times));
                    i = eventsLabels.length;
                    break;
                case "C":
                    //Not counted, may be in the future
                    break;
                case "A":
                    //Not counted, may be in the future
                    break;
                case "8":
                    playerStats.goOut = _getEventsTimes(times);
                    goOut = playerStats.goOut[0];
                    break;
                case "7":
                    playerStats.goIn = _getEventsTimes(times);
                    goIn = playerStats.goIn[0];
                    break;
                default:
            }
        }

        playerStats.minutes_played = goOut - goIn;

        team.push(playerStats);
}

function _updateRegex(regex, match_info){
    if(!regex){
        regex = "##";
    }

    regex = regex.slice(0, -1); // remove the last character "#"

    let game_partition = "=";

    match_info.goals.forEach(function(value){
        game_partition += "G"
    });
    match_info.assists.forEach(function(value){
        game_partition += "A"
    });
    match_info.red_cards.forEach(function(value){
        game_partition += "R"
    });
    match_info.yellow_cards.forEach(function(value){
        game_partition += "Y"
    });

    game_partition += match_info.minutes_played;

    regex += game_partition + "= "; //close game partition

    return regex + "#"; //close regex
}

function processMatchIds(match, res, done, cb){
    // User_Infos

    let homeTeamIds = {
        main_lineup: [],
        reserves: [],
        staff: []
    };

    let awayTeamIds = {
        main_lineup: [],
        reserves: [],
        staff: []
    };

    const report = res.$("#game_report .column_300");


    //Populate the players with events...

    if(report.length == 0){
        logger.error("Match with zerozero team_id: " + res.options.zerozeroId + " has no report");
        zerozero.proxyFailCallback(res, done);
    }
    else{
        res.$(report[0]).find(".player").each(function() {
            _processPlayerEvents(match, res, this, true, homeTeamIds.main_lineup, match.home_team.main_lineup);
        });
        res.$(report[1]).find(".player").each(function() {
            _processPlayerEvents(match, res, this, true, awayTeamIds.main_lineup, match.away_team.main_lineup);
        });
        res.$(report[2]).find(".player").each(function() {
            _processPlayerEvents(match, res, this, false, homeTeamIds.reserves, match.home_team.reserves);
        });
        res.$(report[3]).find(".player").each(function() {
            _processPlayerEvents(match, res, this, false, awayTeamIds.reserves, match.away_team.reserves);
        });
        res.$(report[4]).find(".player .name .text a").each(function() {
            homeTeamIds.staff.push(+res.$(this).attr('href').match(/\d+/g)[0]);
        });
        res.$(report[5]).find(".player .name .text a").each(function() {
            awayTeamIds.staff.push(+res.$(this).attr('href').match(/\d+/g)[0]);
        });
    }

    footballUserInfoSeason.getMatchUserInfosByZeroZeroId(res.options.competition_season.season_id, homeTeamIds, awayTeamIds, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully fetched match user infos season", result);

            result[0].home_team.forEach(function (value, index) {
                match.home_team.main_lineup[index].name = value.personal_info.name;
                match.home_team.main_lineup[index].avatar = value.personal_info.avatar;
                match.home_team.main_lineup[index].positions = value.personal_info.positions;
                match.home_team.main_lineup[index].nationality = value.personal_info.nationality;
                match.home_team.main_lineup[index].id = value._id;
                match.home_team.main_lineup[index].user_info_id = value.user_info_id;
            });

            result[0].away_team.forEach(function (value, index) {
                match.away_team.main_lineup[index].name = value.personal_info.name;
                match.away_team.main_lineup[index].avatar = value.personal_info.avatar;
                match.away_team.main_lineup[index].positions = value.personal_info.positions;
                match.away_team.main_lineup[index].nationality = value.personal_info.nationality;
                match.away_team.main_lineup[index].id = value._id;
                match.away_team.main_lineup[index].user_info_id = value.user_info_id;
            });

            result[0].home_team_reserves.forEach(function (value, index) {
                match.home_team.reserves[index].name = value.personal_info.name;
                match.home_team.reserves[index].avatar = value.personal_info.avatar;
                match.home_team.reserves[index].positions = value.personal_info.positions;
                match.home_team.reserves[index].nationality = value.personal_info.nationality;
                match.home_team.reserves[index].id = value._id;
                match.home_team.reserves[index].user_info_id = value.user_info_id;
            });

            result[0].away_team_reserves.forEach(function (value, index) {
                match.away_team.reserves[index].name = value.personal_info.name;
                match.away_team.reserves[index].avatar = value.personal_info.avatar;
                match.away_team.reserves[index].positions = value.personal_info.positions;
                match.away_team.reserves[index].nationality = value.personal_info.nationality;
                match.away_team.reserves[index].id = value._id;
                match.away_team.reserves[index].user_info_id = value.user_info_id;
            });

            footballMatch.updateAndReturnByZeroZeroId(res.options.zerozeroId, match, function (err, result) {
                if (err) {
                    logger.error(err);
                    zerozero.proxyFailCallback(res, done)
                }
                else {
                    logger.info("Successfully created match " + result._doc);

                    res.options.match = result._doc;

                    const embedMatch = {
                        id: res.options.match._id,
                        date: res.options.match.date,
                        competition_season:{
                            id: res.options.match.competition_season.id,
                            competition_id: res.options.match.competition_season.competition_id,
                            name: res.options.match.competition_season.name,
                            avatar: res.options.match.competition_season.avatar
                        },
                        home_team: {
                            id: res.options.match.home_team.id,
                            name: res.options.match.home_team.name,
                            avatar: res.options.match.home_team.avatar,
                            goals: res.options.match.home_team.goals.length
                        },
                        away_team: {
                            id: res.options.match.away_team.id,
                            name: res.options.match.away_team.name,
                            avatar: res.options.match.away_team.avatar,
                            goals: res.options.match.away_team.goals.length
                        }
                    }
                    cb(embedMatch, res, done);
                }
            });
        }
    })
}

function processMatchPlayers(nestedMatch, res, done, cb){

    footballUserInfoSeason.updateUserInfosStats(res.options.match, nestedMatch, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully updated user infos game", result);

            cb(res, done);
        }
    })
}

function processMatchTeams(nestedMatch, res, done, cb){
    footballTeamSeason.updateTeamsStandings(res.options.match, nestedMatch, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully updated team game", result);

            cb(nestedMatch, res, done);
        }
    })
}

function processMatchCompetition(nestedMatch, res, done, cb){
    footballCompetitionSeason.updateCompetitionStandingsAndStats(res.options.match, nestedMatch, function(err, result){
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully updated competition_season season", result);

            cb(nestedMatch, res, done);
        }
    })
}

function processUserInfoRegex(res, done){
    let homeTeamIds = {
        main_lineup: [],
        reserves: [],
        staff: []
    };

    let awayTeamIds = {
        main_lineup: [],
        reserves: [],
        staff: []
    };

    res.options.match.home_team.main_lineup.forEach(function (value) {
        homeTeamIds.main_lineup.push(value.user_info_id);
    });

    res.options.match.away_team.main_lineup.forEach(function (value) {
        awayTeamIds.main_lineup.push(value.user_info_id);
    });

    res.options.match.home_team.reserves.forEach(function (value) {
        homeTeamIds.reserves.push(value.user_info_id);
    });

    res.options.match.away_team.reserves.forEach(function (value) {
        awayTeamIds.reserves.push(value.user_info_id);
    });

    footballUserInfo.getMatchUserInfos(homeTeamIds, awayTeamIds, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully fetched match user infos", result);

            let regexes = {};

            result[0].home_team.forEach(function (value, index) {
                regexes[value._id] = _updateRegex(value.actions_regex, res.options.match.home_team.main_lineup[index])
            });

            result[0].away_team.forEach(function (value, index) {
                regexes[value._id] = _updateRegex(value.actions_regex, res.options.match.away_team.main_lineup[index])
            });

            result[0].home_team_reserves.forEach(function (value, index) {
                regexes[value._id] = _updateRegex(value.actions_regex, res.options.match.home_team.reserves[index])
            });

            result[0].away_team_reserves.forEach(function (value, index) {
                regexes[value._id] = _updateRegex(value.actions_regex, res.options.match.away_team.reserves[index])
            });

            footballUserInfo.updateRegexNewMatch(regexes, function (err, result) {
                if (err) {
                    logger.error(err);
                    zerozero.proxyFailCallback(res, done);
                }
                else {
                    logger.info("Successfully updated user infos regexes", result);

                    done();
                }
            });
        }
    })
}

const processMatchInfo = function (err, res, done){
    let match = {
        played: true,
        external_ids: {
            zerozero: res.options.zerozeroId
        },
        date: res.options.matchDate,
        duration: 0,
        stadium: '',
        referee: '',
        competition_season: {
            name: res.options.competition_season.name,
            phase: '',
            avatar: res.options.competition_season.avatar,
            id: res.options.competition_season._id
        },
        home_team: {
            id: '',
            name: '',
            avatar: '',
            goals: [],
            main_lineup: [],
            reserves: [],
            coach: {
                name: '',
                avatar: '',
                id: ''
            }
        },
        away_team: {
            id: '',
            name: '',
            avatar: '',
            goals: [],
            main_lineup: [],
            reserves: [],
            coach: {
                name: '',
                avatar: '',
                id: ''
            }
        }
    };

    initializeMatchModel(match, res, done, function(match, res, done) {
        processMatchIds(match, res, done, function(nestedMatch, res, done) {
            processMatchCompetition(nestedMatch, res, done, function (nestedMatch, res, done) {
                processMatchTeams(nestedMatch, res, done, function (nestedMatch, res, done) {
                    processMatchPlayers(nestedMatch, res, done, function (res, done) {
                        processUserInfoRegex(res, done);
                    });
                });
            });
        });
    });
}

module.exports = {
    processMatchInfo: processMatchInfo
}
