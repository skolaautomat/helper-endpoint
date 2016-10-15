var config = require('config');
var express = require('express');
var fns = require('./functions.js');
var app = express();

app.get('/v1/title-from-url/', function (req, res) {
    var url = req.query.url;
    fns.getTitleFromURL(url, function(err, title) {
        if(!err) 
            res.json({ title: title });
        else
            res.json(err);
    })   
});

var port = config.get('server.port');
app.listen(port, function() {
    console.log("App listening on port " + port)
});