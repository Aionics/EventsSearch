module.exports = {
    afisha: function (search, done) {
        const querystring = require('querystring');
        const Request = require('request')
        search = querystring.escape(search)
        Request.get('https://www.afisha.ru/search/?search_str=' + search, function (error, response, body) {
            require("jsdom").env(body, function (err, window) {
                if (err) {
                    console.error(err);
                    return;
                }
                let $ = require("jquery")(window);
                answer = []
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
    }
}
