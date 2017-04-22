const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require("body-parser");
const Search = require('./search')

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
    Search[req.body.target](req.body.request, function (answer) {
        res.respond(null, answer);
    })
})

const PORT = 7020;
app.listen(PORT, function () {
    console.log('listening on ' + PORT);
});
