const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
const format = require("string-template");
const footballCompetition = require('../../../models/football_competition');
const footballCompetitionSeason = require('../../../models/football_competition_season');
const footballTeam = require('../../../models/football_team');
const footballTeamCrawler = require('./football_team');
const footballMatch = require('../../../models/football_match');
const footballMatchCrawler = require('./football_match');
const footballSeason = require('../../../models/football_season');

const updateCompetition = function (err, res, done){
    let competition = {
        name: '',
        avatar: ''
    };

    competition.name = res.$('#page_header .factsheet .name').length > 0 ?
        res.$('#page_header .factsheet .name').html() :
        '';

    competition.avatar = res.$('#page_header_container .logo img').length > 0 ?
        "http://www.zerozero.pt/" + res.$('#page_header_container .logo img')[0].attribs["data-cfsrc"] :
        '';

    logger.info("Competition info:", competition);

    //Fetch Editions Id's

    let editionIds = [];

    res.$("#page_main .box table td a").each(function(){
        editionIds.push(
            {
                edition_id: res.$(this).attr("href").match(/\d+/g)[0],
                season_name: res.$(res.$(this).find("div div")[1]).html()
            }
        );
    });

    // Beta, first 5 years.
    editionIds = editionIds.splice(1, 1);

    footballCompetition.updateAndReturnByZeroZeroId(res.options.zerozeroId, competition, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {

            logger.info("Updated competition", result._doc);

            editionIds.forEach(function(edition){
                zerozero.queue({
                    uri:format(baseUris.COMPETITION_EDITION, { edition_id: edition.edition_id }),
                    priority: 1,
                    callback: proxyHandler.crawl,
                    successCallback: updateCompetitionSeason,
                    zerozeroId: edition.edition_id,
                    competition: result._doc,
                    season_name: edition.season_name
                });
            });
            done();
        }
    });

}

const updateCompetitionSeason = function (err, res, done){
    if(res.$('#edition_table').length == 0){
        res.$('#page_main tr td .text a').each(function() {
            let seasonId = res.$(this).attr('href').match(/\d+/g)[0];

            zerozero.queue({
                uri:format(baseUris.COMPETITION_EDITION, { edition_id: seasonId }),
                priority: 1,
                callback: proxyHandler.crawl,
                successCallback: updateCompetitionSeason,
                zerozeroId: seasonId,
                competition: res.options.competition,
                season_name: res.options.season_name
            });
        });

        done();
    }
    else {
        footballSeason.getSeasonByName(res.options.season_name, function (err, result) {
            if (err) {
                logger.error(err);
                zerozero.proxyFailCallback(res, done);
            }
            else {
                let competition_season = {
                    competition_id: res.options.competition._id,
                    season_id: result._doc._id,
                    name: '',
                    avatar: '',
                    external_ids: {
                        zerozero: res.options.zerozeroId,
                    }
                };

                competition_season.name = res.$('#page_header .factsheet .name').length > 0 ?
                    res.$('#page_header .factsheet .name').html() :
                    '';

                competition_season.avatar = res.$('#page_header_container .logo img').length > 0 ?
                    "http://www.zerozero.pt/" + res.$('#page_header_container .logo img')[0].attribs["data-cfsrc"] :
                    '';

                footballCompetitionSeason.updateAndReturnByZeroZeroId(res.options.zerozeroId, competition_season, function (err, result) {
                    if (err) {
                        logger.error(err);
                        zerozero.proxyFailCallback(res, done);
                    }
                    else {

                        logger.info("Updated competition season", result._doc);

                        zerozero.queue({
                            uri: format(baseUris.COMPETITION_EDITION_MATCHES, {
                                edition_id: res.options.zerozeroId,
                                page: 1
                            }),
                            priority: 1,
                            callback: proxyHandler.crawl,
                            successCallback: updateCompetitionSeasonCalendar,
                            zerozeroId: res.options.zerozeroId,
                            competition_season: result._doc
                        });

                        res.options.competition_season = result._doc;

                        updateCompetitionSeasonTeams(err, res, done)
                    }
                });
            }
        })
    }
}

const updateCompetitionSeasonTeams = function (err, res, done){
    let teamIds = [];

    res.$('#edition_table tbody tr .text a').each(function() {
        let teamId = res.$(this).attr('href').match(/\d+/g)[0];
        let seasonId = res.$(this).attr('href').match(/\d+/g)[1];

        zerozero.queue({
            uri:format(baseUris.TEAM_INFO, { team_id: teamId, season_id: seasonId }),
            priority: 2,
            callback: proxyHandler.crawl,
            successCallback: footballTeamCrawler.updateTeamInfo,
            zerozeroId: teamId,
            competition_season: res.options.competition_season
        });

        teamIds.push(teamId);
    });

    logger.info("Edition Teams IDs: ", teamIds);

    done();
}

const updateCompetitionSeasonCalendar = function (err, res, done){

    res.$("#pagination li").each(function(index){
        zerozero.queue({
            uri:format(baseUris.COMPETITION_EDITION_MATCHES, { edition_id: res.options.zerozeroId, page: index+1 }),
            priority: 1,
            callback: proxyHandler.crawl,
            successCallback: updateCompetitionSeasonMatches,
            zerozeroId: res.options.zerozeroId,
            competition_season: res.options.competition_season
        });
    });

    zerozero.queue({
        uri:format(baseUris.COMPETITION_EDITION_MATCHES, { edition_id: res.options.zerozeroId, page: 1 }),
        priority: 10,
        callback: proxyHandler.crawl,
        successCallback: footballTeamCrawler.processTeamPositionsAndSeason,
        zerozeroId: res.options.zerozeroId,
        competition_season: res.options.competition_season
    });

    done();

}

const updateCompetitionSeasonMatches = function (err, res, done){
    let matchesToSchedule = [];

    const test = res.$("#team_games tbody .parent").each(function() {
        const matchDate = new Date(res.$(this.children[1]).html() + " " + res.$(this.children[2]).html());
        const matchId = res.$(this).attr("id");

        if(matchId) {
            //Dar meio dia para o jogo processar
            if (matchDate + 0.5 > Date.now()) {
                matchesToSchedule.push({
                    played: false,
                    date: matchDate,
                    competition_season: {
                        id: res.options.competition_season._id
                    },
                    external_ids: {
                        zerozero: matchId
                    }
                })
            }
            else {
                zerozero.queue({
                    uri: format(baseUris.MATCH_INFO, {match_id: matchId}),
                    callback: proxyHandler.crawl,
                    priority: 9,
                    successCallback: footballMatchCrawler.processMatchInfo,
                    zerozeroId: matchId,
                    matchDate: matchDate,
                    competition_season: res.options.competition_season
                });
            }
        }
    });

    footballMatch.insertFutureMaches(matchesToSchedule, function (err, matches) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Matches not played: ", matches);
            done();
        }
    });
}

module.exports = {
    updateCompetition: updateCompetition,
    updateCompetitionSeason: updateCompetitionSeason,
    updateCompetitionSeasonTeams: updateCompetitionSeasonTeams,
    updateCompetitionSeasonMatches: updateCompetitionSeasonMatches,
    updateCompetitionSeasonCalendar: updateCompetitionSeasonCalendar
}
