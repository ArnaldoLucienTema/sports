// LIBS
const Crawler = require("crawler");
const logger = require('../../logging');
const proxyHandler = require('./proxy_handler');
const request = require('request');
const format = require("string-template");

const footballTeam = require("../../models/football_team");

// CRAWLER RELATED
const baseUris = require('./base_uris');

let zerozero = new Crawler({
    rateLimit: 50,
    jQuery: {
        name: 'cheerio',
        options: {
            normalizeWhitespace: true,
            xmlMode: true
        }
    }
});

// When a crawl task enters the queue
zerozero.on('schedule',function(options){
    let session = proxyHandler.getSession();

    var j = request.jar();
    var cookie = request.cookie('jcenable=1');
    var captcha = request.cookie('cf_clearance=ffce9ae767f38d597cc9aaf347d6ebf58311e8f9-1530892002-3600');
    var user = request.cookie('zzptremember=' + session.user);
    var url = 'http://www.zerozero.pt';

    j.setCookie(cookie, url);
    j.setCookie(captcha, url);
    j.setCookie(user, url);

    options.proxy = session.proxy;
    options.jar = j,
    logger.info("ADDED " + options.uri + " to the queue: PROXY = " + options.proxy);
});


// When debugging, since the last crawled link is attached,
// it's easy to see what the problem was by clicking on the link and visiting the web page

// When the queue pops a task
zerozero.on('request',function(options){
    logger.info("CRAWLING " + options.uri + ", PROXY = " + options.proxy);
});

// No more requests
zerozero.on('drain',function(options){
    logger.info("NO MORE REQUESTS! DRAINED!");
});

// When it fails, it sets it up to the queue again with the same priorities
// (the queue will always pop the tasks with more priorities)
zerozero.proxyFailCallback = function (res, done){
    zerozero.queue(res.options);
    done();
}

module.exports = zerozero;

// The class should end here


// The remain code serves for forcing to run the crawler

const competitionCrawler = require('./functions/football_competition');

logger.info("Testing the editions...");

zerozero.queue({
    uri: format(baseUris.COMPETITION, {competition_id: 3}), // 3 - ID da Super Liga
    callback: proxyHandler.crawl,
    successCallback: competitionCrawler.updateCompetition,
    proxyFailCallback: zerozero.proxyFailCallback,
    zerozeroId: 3
});
