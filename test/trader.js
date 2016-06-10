/**(
 * @fileOverview Opp and Finder
 * )
 */

var schedule = require('node-schedule');
var request = require('request');
var async = require('async');
var btoa = require('btoa');
var fs = require('fs');
var qs = require('querystring');
var exec = require('child_process').exec;
var R = require('ramda');
var _ = require('lodash');


exec("cat trading.json", {
  cwd: '/Users/nerdfiles/Tools/Festivals/test'
}, function(error, stdout, stderr) {

  var requests = [];
  var d = JSON.parse(stdout);

  _.each(d, function (coin) {

    requests.push(function (callback) {

      var site_root = 'https://sheetsu.com/apis/v1.0/32afedf19534';
      var API_KEY = 'woU2JJTeskw9SZHgHmgb';
      var API_SECRET = 'uo63spB5iLYW4ebjtbHmphgs6rmyLMzPbjJGhYui';
      var keyPair = API_KEY + ":" + API_SECRET;
      var usd_btc = R.view(R.lensProp('btc_usd'), d.stats);
      var opp = {
        "spread"  : ( parseFloat(d.lower) - parseFloat(d.upper) ) - 100,
        "grow"    : d.grow.join(' '),
        "btc_usd" : usd_btc
      };

      console.log('=== Arb!');
      console.log(opp);

      request({
        url     : site_root,
        method  : 'POST',
        json    : opp,
        headers: {
          "Authorization": "Basic " + btoa(keyPair)
        }
      }, function (err, res, body) {
        if (!err && res.statusCode === 200) {
          console.log('Not updated!')
        }
        console.log('/// Adding ' + coin);

        var j = schedule.scheduleJob('*/1 * * * *', function(){
          callback(err, body);
        }); // @see https://sheetsu.com/docs/beta#rates

      });


    })

  });

  async.series(requests, function (err, result) {
    console.log(result);
  });

});

