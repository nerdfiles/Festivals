var docopt = require('docopt-js');
var btoa = require('btoa');
var qs = require('querystring');
var request = require('request');
var async = require('async');

var fs = require('fs');
var default_headers = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-us,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
  // 'Connection': 'keep-alive',
  'Cache-Control': 'max-age=0'
};

function docParser (f) {
  return f.toString().
    replace(/^[^\/]+\/\*!?/, '').
    replace(/\*\/[^\/]+$/, '');
}

var doc = docParser(function() {/*!
Usage:
  festivals search <term> [--timeout=<seconds>]
  festivals show <concept> [--timeout=<seconds>]
  festivals add <schema_url>
  festivals scrape <spreadsheet_url> <file_url>
  festivals generate <schema>
  festivals -h | --help | --version
*/});

function __interface__ (config) {

  var defaultOpts = {
    'search'       : false,
    '<term>'       : null,
    'show'         : false,
    '<concept>'    : null,
    'add'          : false,
    '<schema_url>' : null,
    'scrape'         : false,
    '<spreadsheet_url>'   : null,
    '<file_url>'   : null,
    'generate'     : false,
    '<schema>'     : null,
    '-h'           : false,
    '--help'       : false,
    '--version'    : false
  };
  var opts = config || defaultOpts;

  var site_root = 'https://sheetsu.com/apis/v1.0/1903d815';
  var schemaConstruct = opts['<schema_url>'];
  //var potentialAction = '/login';

  /*
   *  var potentialAction = '';
   *
   *  if (opts['add'] && opts['<schema_url>'] !== null) {
   *    var schemas = [];
   *    schemas.push(schemaConstruct);
   *
   *    fs.writeFile(__dirname + "/tmp/test.list", schemas.pop(), function(err) {
   *      if (err)  return console.log(err);
   *    });
   *
   *  }
   *
   */

  if (opts['scrape']) {
    var sep = '/';
    fs.readFile(__dirname + sep + opts['<file_url>'], "utf8", function (err, data) {
      var site_root = opts['<spreadsheet_url>'];
      if (err)  throw err;
      var _data = JSON.parse(data); // array
      var potentialAction = '';
      var requests = [];
      var API_KEY = 'noPivQpB6JZxngm3q8La';
      var API_SECRET = 'EDohYU5TeMFJAZp6a99y4QPPvvXkdqUqZwCVCQgH';
      var keyPair = API_KEY + ":" + API_SECRET;

      _data.fests.forEach(function (festival) {
        delete festival['@context'];
        delete festival['@type']
        var tempName = festival.location.name;
        if (festival.location && (festival.location.name && festival.location.address))
          festival.locale = festival.location.name + ' / ' + festival.location.address;
        else
          festival.locale = festival.location.address;
        delete festival['location'];

        requests.push(function (callback) {
          request({
            url     : site_root + potentialAction,
            method  : 'POST',
            json    : festival,
            headers: {
              "Authorization": "Basic " + btoa(keyPair)
            }
          }, function (err, res, body) {
            if (!err && res.statusCode === 200) {
              console.log('Not updated!')
            }
            console.log('/// Adding ' + tempName);
            setTimeout(function() {
              callback(err, body);
            }, 5000); // @see https://sheetsu.com/docs/beta#rates

          });

        });
      });

      async.series(requests, function (err, result) {
        console.log(result);
      });
    });

  }
}

function init () {
  var initConfig = docopt.docopt(doc, { version: '0.0.1' });
  __interface__(initConfig);
}

init();
