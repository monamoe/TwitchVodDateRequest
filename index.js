var request = require("request");

const { twitchClientId } = require("./config.json");

//Video you are getting the date from
twitchVodLink = "https://www.twitch.tv/videos/317145028";

//splits the URL to only get the video ID
var res = twitchVodLink.split("videos/");
var res = res[1].split("?");

//send request for information on the VOD
request.get(
  {
    url: `https://api.twitch.tv/kraken/videos/` + res[0],
    headers: { "Client-ID": twitchClientId },
  },
  (err, res, body) => {
    //convert text into a JavaScript object
    let data = JSON.parse(body);

    // Name and Title
    console.log(data.channel.name + " | " + data.title);

    // Time
    var secounds = data.length;
    var minutes = Math.floor(secounds / 60);
    var secounds = secounds % 60;
    var hours = Math.floor(minutes / 60);
    var minutes = Math.floor(minutes % 60);
    console.log("Length : ", hours + ":" + minutes + ":" + secounds);

    // Views
    console.log("Views: " + data.views);

    //Data Created
    var dateTimeString = data.created_at;
    var timeString = dateTimeString.split("T");
    var brokenTimeString = timeString[0].split("-");
    console.log(
      "Date: " +
        brokenTimeString[0] +
        " " +
        brokenTimeString[1] +
        " " +
        brokenTimeString[2]
    );

    //Link to thumbnail
    console.log("Thumbnail: " + data.thumbnails[1].url);
  }
);
