const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
var format = require("string-template");
const footballTeam = require('../../../models/football_team');
const footballTeamSeason = require('../../../models/football_team_season');
const footballCompetitionSeason = require('../../../models/football_competition_season');
const footballUserInfoCrawler = require('../functions/football_user_info');


const updateTeamInfo = function (err, res, done) {

    let team = {
        acronym: '',
        avatar: '',
        name: '',
        full_name: '',
        external_ids: {
            zerozero: res.options.zerozeroId
        }
    };

    team.acronym = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html() :
        '';

    team.avatar = res.$("#page_header .logo img") ?
        'https://www.zerozero.pt/' + res.$("#page_header .logo img")[0].attribs["data-cfsrc"] :
        '';

    team.name = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html() :
        '';

    //Different age groups from seniors
    if(team.name != ''){
        if( team.name.split('<')[1] != undefined){
            team.name = team.name = team.name.split('<')[0].trim() + " " + team.name.split('<')[1].split('>')[1];
        }
        else{
            team.name = team.name = team.name.split('<')[0].trim()
        }
    }

    team.fullName = res.$("#entity_bio .bio")[0] ?
        res.$("#entity_bio .bio")[0].children[1].data :
        '';

    logger.info("Team Info:", team);

    footballTeam.updateAndReturnByZeroZeroId(res.options.zerozeroId, team, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully updated team " + result._doc);

            res.options.team = result._doc;

            updateTeamSeasonInfo(err, res, done);
        }
    });
};

const updateTeamSeasonInfo = function (err, res, done) {

    let team_season = {
        team_id: res.options.team._id,
        season_id: res.options.competition_season.season_id,
        name: res.options.team.name,
        avatar: res.options.team.avatar,
        external_ids: {
            zerozero: res.options.team.external_ids.zerozero,
        }
    };

    footballTeamSeason.updateAndReturnByZeroZeroId(res.options.zerozeroId, res.options.competition_season.season_id, team_season, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            res.options.team_season = result._doc;

            cascadeTeamUpdates(res, done);
        }
    });
};

// Adds team to the copetition and the other way around
function cascadeTeamUpdates(res, done) {
    const team_season = res.options.team_season;
    const competition_season = res.options.competition_season;

    footballTeamSeason.addCompetitionToTeam(team_season._id, competition_season, function (err, result) {
        if (err) {
            logger.error("Error when adding competition_season to team:", err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully added competition_season " + competition_season.name + " to team " + team_season.name, result);

            footballCompetitionSeason.addTeamToCompetition(competition_season._id, team_season, function (err, result) {
                if (err) {
                    logger.error("Error when adding team to competition_season:", err);
                    zerozero.proxyFailCallback(res, done);
                }
                else {
                    logger.info("Successfully added team " + team_season.name + " to competition_season " + competition_season.name, result);
                    processAllTeamPlayers(res, done);
                }
            });
        }
    });
}

function processAllTeamPlayers(res, done) {
    let playerIds = [];

    res.$("#team_squad .staff").each(function () {
        let playerId = res.$(res.$(this).find(".name .micrologo_and_text .text a")[0]).attr('href').match(/\d+/g)[0];
        let playerNumber = res.$(res.$(this).find(".number")[0]).html();

        zerozero.queue({
            uri: format(baseUris.PLAYER_INFO, {player_id: playerId}),
            priority: 3,
            callback: proxyHandler.crawl,
            successCallback: footballUserInfoCrawler.updateUserInfo,
            proxyFailCallback: zerozero.proxyFailCallback,
            zerozeroId: playerId,
            competition_season: res.options.competition_season,
            team_season: res.options.team_season,
            player_number: playerNumber
        });

        playerIds.push(playerId);
    });

    zerozero.queue({
        uri: format(baseUris.PLAYER_INFO, {player_id: 450}),
        priority: 4,
        callback: proxyHandler.crawl,
        successCallback: footballUserInfoCrawler.updateUserInfoCurrentSeasons,
        proxyFailCallback: zerozero.proxyFailCallback,
        competition_season: res.options.competition_season,
        team_season: res.options.team_season
    });

    logger.info("Team Player IDs in processing: " + playerIds);

    done();

}

//not used, may be useful in the future...
/*
const processAllTeamGames = function (err, res, done) {
    let matchIds = [];

    res.$("#team_games table tr .result a").each(function () {
        let matchId = res.$(this).attr('href').match(/\d+/g)[0];
        let seasonId = res.$(this).attr('href').match(/\d+/g)[1];

        zerozero.queue({
            uri: format(baseUris.MATCH_INFO, {match_id: matchId, season_id: seasonId}),
            priority: 9,
            callback: proxyHandler.crawl,
            successCallback: footballMatchCrawler.processMatchInfo,
            zerozeroId: matchId
        });

        matchIds.push(matchId);
    });

    logger.info("Team Matches IDs in processing: " + gameIds);

    done();
};
*/

function processTeamPositionsAndSeason(err, res, done){
    footballCompetitionSeason.getById(res.options.competition_season._id, function (err, result){
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            let competition_season = result._doc;

            let ids = [];
            let team_ids = [];

            competition_season.standings.forEach(function (team) {
                ids.push(team.id);
                team_ids.push(team.team_id);
            })

            footballTeamSeason.getByIds(ids, function (err, result) {
                if (err) {
                    logger.error(err);
                    zerozero.proxyFailCallback(res, done);
                }
                else {
                    let seasons = result;

                    footballTeamSeason.updateTeamsPositions(competition_season, seasons, function (err, result) {
                        if (err) {
                            logger.error(err);
                            zerozero.proxyFailCallback(res, done);
                        }
                        else {
                            footballTeam.updateCurrentSeasons(seasons, function (err, result) {
                                if (err) {
                                    logger.error(err);
                                    zerozero.proxyFailCallback(res, done);
                                }
                                else {
                                    done();
                                }
                            });
                        }
                    });
                }
            })
        }
    })
}

module.exports = {
    updateTeamInfo: updateTeamInfo,
    processTeamPositionsAndSeason: processTeamPositionsAndSeason
}
