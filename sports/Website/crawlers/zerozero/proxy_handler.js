const logger = require('../../logging');

const proxies = [undefined];
const users = {
    undefined: '48e0cceb-330a-4fcb-bc9e-ad3730af907e',
    'http://139.162.235.163:31028':'879739dc-74ce-4598-ad6e-6b540fd28af5'
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
 * Detecta certos erros no pedido e automaticamente muda de proxy (Caso haja mais proxies disponíveis)
 */
const crawl = function (err, res, done) {
    if( res.$(".g-recaptcha").length > 0){
        logger.error("Proxy failed at request: " + res.options.uri + " with PROXY: " + res.options.proxy);
        res.options.proxyFailCallback(err, res, done);
    }
    else{
        res.options.successCallback(err, res, done);
    }
}

const getSession = function() {
    let proxy = proxies[getRandomInt(proxies.length)];
    let user = users[proxy]

    return {
        proxy: proxies[getRandomInt(proxies.length)],
        user: user
    };
}

module.exports = {
    crawl: crawl,
    getSession: getSession
}