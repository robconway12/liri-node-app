require('dotenv').config();

var axios = require('axios');
var moment = require('moment');
var command = process.argv[2];
var searchItem = process.argv.slice(3).join(' ');

function getBIT() {
	axios
		.get('https://rest.bandsintown.com/artists/' + searchItem + '/events?app_id=codingbootcamp')
		.then(function(response) {

            //for (let i = 0; i < response.length; i++) {

                console.log(response.data[0].venue.name + '\n'
                        + response.data[0].venue.city + ', ' + response.data[0].venue.country + '\n'
                        + moment(response.data[0].datetime).format('L') );
            //} 
            }
        )
		.catch(function(error) {
            console.log(error);}
        );
}

function getSpotify() {
	var Spotify = require('node-spotify-api');
	var keys = require('./keys.js');
	var spotify = new Spotify(keys.spotify);

	spotify.search({ type: 'track', query: searchItem, limit: 1 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		console.log(data);
	});
}

function getOMDB() {}

switch (command) {
	case 'concert-this':
		getBIT();
		break;
	case 'spotify-this-song':
		getSpotify();
		break;
	case 'movie-this':
		getOMDB();
		break;
	case 'do-what-it-says':
		// code block
		break;
}
