const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require("body-parser");
const Search = require('./search')
const async = require('async')
const logger = require('./logger')(__dirname + '/logs.txt')

app.set('json spaces', 40);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (err, res, next) {
    res.respond = function (err, data) {
        if (typeof data == 'undefind') {
            data = null;
        }
        let answer = {
            err: err,
            data: data
        }
        res.send(answer);
    }
    next();
});

app.use(express.static(__dirname + '/www'));
app.get('/', function (req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/www" })
});

app.post('/search', function (req, res, next) {
    async.parallel({
        afisha: function (done) {
            Search.afisha(req.body.request, function (answer) {
                done(null, answer)
            });
        },
        kudago: function (done) {
            Search.kudago(req.body.request, function (answer) {
                done(null, answer)
            });
        },
        todotogo: function (done) {
            Search.todotogo(req.body.request, function (answer) {
                done(null, answer)
            });
        },
        culture: function (done) {
            Search.culture(req.body.request, function (answer) {
                done(null, answer)
            });
        },

    }, function (err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        logger.info(req.body)
        res.respond(null, result);
    })

})

const PORT = 7020;
app.listen(PORT, function () {
    console.log('listening on ' + PORT);
});
