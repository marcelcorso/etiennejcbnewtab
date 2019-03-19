const fs = require('fs');
require('dotenv').config();

var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter({
  "consumerKey": process.env.CONSUMER_KEY,
  "consumerSecret": process.env.CONSUMER_SECRET,
  "accessToken": process.env.ACCESS_TOKEN,
  "accessTokenSecret": process.env.ACCESS_TOKEN_SECRET,
});

var error = function (err, response, body) {
  console.log('ERROR [%s]', err, body);
};

var success = function (data) {
  // console.log('Data [%s]', data);

  let statuses = JSON.parse(data);

  let gifs = [];
  for (var i = 0; i < statuses.length; i++) {
    let s = statuses[i];

    if (
        ('extended_entities' in s) &&
        (s.extended_entities.media[0].type == "animated_gif")) {
      
      gifs.push(s.extended_entities.media[0].video_info.variants[0].url);
    }
  }

  fs.writeFile('/tmp/gifs.json', JSON.stringify(gifs), function(err) {
    if (err) {
        return console.log(err);
    }
  }); 

};

// twitter.getUserTimeline({ screen_name: 'etiennejcb', count: '100'}, error, success);


const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  twitter.getUserTimeline({ screen_name: 'etiennejcb', count: '100'}, error, success);
  ctx.body = 'Hello World';
});

app.listen(3000);

