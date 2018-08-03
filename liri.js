require("dotenv").config();

//change screen_name according to your own API screen name
var params = {screen_name: 'boot_al'};

//user inputs in node
var userCmd = process.argv[2];
var userSearch = process.argv.splice(3).join("+");

//general node npm's
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");

//Twitter and Spotify npm's
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function command(userCmd){
	switch(userCmd){
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThisSong();
			break;
		case "movie-this":
			movieThis();
			break;
		case "do-what-it-says": 
			doWhatItSays();
			break;
		default: 
			console.log("Rerun and enter: \n\t'my-tweets', \n\t'spotify-this-song' <song name>, \n\t'movie-this' <movie name>, \n\t'do-what-it-says'.");
	}

	fs.appendFile("log.txt", "\r\nnode liri.js" + userCmd, function(err){
		if(err) console.log(err);
		else console.log("Command line logged!");
	});
}

command(userCmd);

// User input is `my-tweets`
function myTweets(){
	client.get('statuses/user_timeline', params, function(err, tweets, response) {
		if (!err) {
			for(var i = 0; i < 20; i++){
				console.log("'" + tweets[i].text + "'  Created At: " + tweets[i].created_at);
			}
		}
	});
}

// User input is `spotify-this-song`
function spotifyThisSong(){
	if(userSearch == ""){
		userSearch = "The Sign (US Album) [Remastered]";
	}

	spotify.search({ type: 'track', query: userSearch }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    var songInfo = data.tracks.items[0];
	    //display artist name, song name, link of song, album of song
	 	console.log("Artist: " + songInfo.artists[0].name + "\nSong: " + songInfo.name + "\nAlbum: " + songInfo.album.name + "\nPreview Link: " + songInfo.external_urls.spotify);
	});

}

// User input is `movie-this`
function movieThis(){
	if(userSearch == ""){
		userSearch = "Mr. Nobody";
	}

	var movieName = userSearch;
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			//stores all the information of the movie
			var movieInfo = JSON.parse(body);
			// Title, Year, IMDB Rating, Rotten Tomatoes Rating, Country of production, Language, Plot, Actors/Actresses
		    console.log("Title: " + movieInfo.Title + "\nYear: " + movieInfo.Year + "\nIMDB Rating: " + movieInfo.Ratings[0].Value + "\nRotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + "\nCountry: " + movieInfo.Country + "\nLanguage: " +movieInfo.Language + "\nPlot: " + movieInfo.Plot + "\nActors/Actresses: " + movieInfo.Actors);
		}
	});
}


// User input is 'do-what-it-says'
// Reads random.txt and does what it searches for <command>, <addition info related to command>
function doWhatItSays(){
	fs.readFile("random.txt", "utf-8", function(error, data){
		if(!error){
			var cmdArr = data.split(",");

			userCmd = cmdArr[0];
			userSearch = cmdArr.splice(1).join("+");

			command(userCmd);
		}
	});
}