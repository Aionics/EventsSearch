const logger = require('./logger')
module.exports = {
    afisha: function (search, done) {
        const querystring = require('querystring');
        const Request = require('request')
        search = querystring.escape(search)
        Request.get('https://www.afisha.ru/search/?search_str=' + search, function (error, response, body) {
            require("jsdom").env(body, function (err, window) {
                answer = []
                if (err) {
                    logger.error(err);
                    return done(answer);;
                }
                let $ = require("jquery")(window);
                let links = $('h3 a');
                for (link of links) {
                    let linkId = $(link).attr('id') || ''
                    if (linkId.indexOf('ctl00_CenterPlaceHolder_ucSearchResult_rpResult') != -1) {
                        answer.push({
                            title: $(link).text(),
                            src: $(link).attr('href')
                        })
                    }
                }
                done(answer);

            });
        });
    },
    kudago: function (search, done) {
        const querystring = require('querystring');
        const Request = require('request')
        search = querystring.escape(search)
        Request.get('https://kudago.com/search/?q=' + search + '&location=ekb', function (error, response, body) {
            require("jsdom").env(body, function (err, window) {
                answer = []
                if (err) {
                    logger.error(err);
                    return done(answer);;
                }
                let $ = require("jquery")(window);
                let links = $('.post-list-item-title-link');
                for (link of links) {
                    answer.push({
                        title: $(link).text(),
                        src: 'https://kudago.com' + $(link).attr('href')
                    })
                }
                done(answer);

            });
        });
    },
    // https://www.2do2go.ru/search?locale=5&query=%D0%9B%D0%B5%D0%BA%D1%86%D0%B8%D1%8F
    todotogo: function (search, done) {
        const querystring = require('querystring');
        const Request = require('request')
        search = querystring.escape(search)
        Request.get('https://www.2do2go.ru/search?locale=5&query=' + search, function (error, response, body) {
            require("jsdom").env(body, function (err, window) {
                answer = []
                if (err) {
                    logger.error(err);
                    return done(answer);
                }
                let $ = require("jquery")(window);
                let links = $('.search-result-item_title');
                for (link of links) {
                    answer.push({
                        title: $(link).text(),
                        src: 'https://www.2do2go.ru' + $(link).attr('href')
                    })
                }
                done(answer);

            });
        });
    },
    culture: function (search, done) {
        const querystring = require('querystring');
        const Request = require('request')
        search = querystring.escape(search)
        Request.get('http://www.culture.ru/search?criteria=' + search, function (error, response, body) {
            require("jsdom").env(body, function (err, window) {
                if (err) {
                    logger.error(err);
                    return;
                }
                // fs = require('fs');
                // fs.appendFileSync('html.html', body)
                let $ = require("jquery")(window);
                answer = []
                let links = $('div.News').find('div.heading3 a');
                for (link of links) {
                    answer.push({
                        title: $(link).text(),
                        src: 'http://www.culture.ru' + $(link).attr('href')
                    })
                }
                done(answer);

            });
        });
    }
}
