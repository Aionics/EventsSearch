const Request = require('request')
const fs = require('fs')

Request.get('https://www.afisha.ru/search/?search_str=%D0%B2%D1%8B%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B8', function (error, response, body) {
    require("jsdom").env(body, function(err, window) {
        if (err) {
            console.error(err);
            return;
        }
        let fd = fs.openSync('html.html', 'w')
        fs.writeSync(fd, body)
        fs.closeSync(fd)
        // const $ = require("jquery")(window);
        // let links = $('h3.theme-item__title a');
        // for (link of links) {
        //     console.log($(link).text());
        // }
    });
});
