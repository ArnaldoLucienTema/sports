// LIBS
const Crawler = require("crawler");
const logger = require('../logging');
const format = require("string-template");
const baseUris = require('../crawlers/zerozero/base_uris');



zerozero.on('schedule',function(options){
    options.proxy = proxyHandler.getProxy();
    logger.info("ADDED " + options.uri + " to the queue: PROXY = " + options.proxy);
});

zerozero.on('request',function(options){
    logger.info("CRAWLING " + options.uri + ", PROXY = " + options.proxy);
});

zerozero.on('drain',function(options){
    logger.info("NO MORE REQUESTS! DRAINED!");
});

zerozero.proxyFailCallback = function (res, done){
    zerozero.queue(res.options);
    done();
}

module.exports = zerozero;

//Testing

const footballTeamCrawler = require('./functions/football_team');
const competitionCrawler = require('./functions/football_competition');

logger.info("Testing the editions...");

zerozero.queue({
    uri:format(baseUris.TEAM_INFO, { team_id: 9 }),
    callback: proxyHandler.crawl,
    successCallback: footballTeamCrawler.updateTeamInfo,
    proxyFailCallback: zerozero.proxyFailCallback,
    zerozeroId: 9
});

zerozero.queue({
    uri:format(baseUris.COMPETITION_EDITION_MATCHES, { edition_id: 109369 }),
    callback: proxyHandler.crawl,
    successCallback: competitionCrawler.updateCompetitionMatches,
    proxyFailCallback: zerozero.proxyFailCallback,
    zerozeroId: 109369
});
