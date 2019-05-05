require('dotenv').config();

var axios = require('axios');
var moment = require('moment');
var command = process.argv[2];
var searchItem = process.argv.slice(3).join(' ');

function getBIT() {
	axios
		.get('https://rest.bandsintown.com/artists/' + searchItem + '/events?app_id=codingbootcamp')
		.then(function(response) {
			for (let i = 0; i < response.data.length; i++) {
				console.log(
					`\nVenue: ${response.data[i].venue.name}\nCity: ${response.data[i].venue.city}, ${
						response.data[i].venue.region
					} ${response.data[i].venue.country}\nDate: ${moment(response.data[i].datetime).format(
						'L'
					)}\n\n----------------`
				);
			}
		})
		.catch(function(error) {
			console.log(error);
		});
}

function getSpotify() {
	var Spotify = require('node-spotify-api');
	var keys = require('./keys.js');
	var spotify = new Spotify(keys.spotify);

	spotify.search({ type: 'track', query: searchItem, limit: 1 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		console.log(
			data.tracks.items[0].artists +
				'\n' +
				data.tracks.items[0].name +
				'\n' +
				data.tracks.items[0].preview_url +
				'\n' +
				data.tracks.items[0] +
				'\n'
		);
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
