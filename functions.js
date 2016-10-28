var rp = require('request-promise');
var cheerio = require('cheerio');

function getTitleFromURL(url, cb) {

    if(!url) {
        cb({error:true, message:"Error"});

        return;
    }

    var options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function ($) {
            var title = $('head > title').text();

            cb(false, title); 
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            cb({error:true, message:"Error"}); 
        });
};

var exports = module.exports = {};

exports.getTitleFromURL = getTitleFromURL;

