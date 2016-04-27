var request = require('request');
var fs = require('fs');

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
  festivals scrape <file_url>
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
    'fire'         : false,
    '<file_url>'   : null,
    'generate'     : false,
    '<schema>'     : null,
    '-h'           : false,
    '--help'       : false,
    '--version'    : false
  };
  var opts = config || defaultOpts;

  var site_root = 'https://sheetsu.com/apis/v1.0/d74be6c0';
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

  if (opts['fire']) {
    var sep = '';
    fs.readFile(__dirname + sep + opts['<file_url>'], "utf8", function (err, data) {
      if (err)  throw err;

      data.forEach(function (d) {
        var dataConstruct = d;

          request({
            url     : site_root + potentialAction,
            headers : default_headers,
            method  : 'POST',
            body    : JSON.stringify(dataConstruct)
          }, function (err, res, body) {
            if (!err && res.statusCode == 200) {
              console.log(body);
            }
          });
      });
    });
  }
}

function init () {
  var initConfig = docopt.docopt(doc, { version: '0.0.1' });
  __interface__(initConfig);
}

init();
