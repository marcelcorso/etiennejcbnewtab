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

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  // ctx.body = "yo";
  console.log('got requesto');
  
  try {
  fs.readFile('/tmp/gifs.json', 'utf8', (err, data) => {
    ctx.body = "zinga";
    console.log('tried to read file');
    
    if (err != null) {
      console.log('there was an err reading file. wwhwwhyyy', err);      
      ctx.body = "zunbgg";
      next();
    } else {
      console.log('found file. cache hit');
       // cache hit
      ctx.body = data;
      next();
    }
  });
  } catch (err) {
    ctx.body = "566";
    console.log('not found file maybe. cache misssss');
    await twitter.getUserTimeline({ screen_name: 'etiennejcb', count: '100'}, error, (data) => {
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

      let resp = JSON.stringify(gifs)

      fs.writeFile('/tmp/gifs.json', resp, function(err) {
        if (err) {
          return console.log(err);
        }
      }); 

      ctx.body = resp; 
      next();
    });
  } finally {
     // next(); 
  }
  console.log("anything");
  // ctx.body = "87665";
});

app.listen(3000);



