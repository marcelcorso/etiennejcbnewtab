require('dotenv').config();

var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter({
  "consumerKey": process.env.CONSUMER_KEY,
  "consumerSecret": process.env.CONSUMER_SECRET,
  "accessToken": process.env.ACCESS_TOKEN,
  "accessTokenSecret": process.env.ACCESS_TOKEN_SECRET,
});

console.log(process.env);

var error = function (err, response, body) {
  console.log('ERROR [%s]', err, body);
};

var success = function (data) {
  console.log('Data [%s]', data);
};

twitter.getUserTimeline({ screen_name: 'etiennejcb', count: '10'}, error, success);
