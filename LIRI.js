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

	spotify.search({ type: 'track', query: searchItem }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		for (let i = 0; i < data.tracks.items.length; i++) {
			console.log(
				`\nArtist: ${data.tracks.items[i].artists[0].name}\nSong: ${data.tracks.items[i].name}\nPreview: ${
					data.tracks.items[i].preview_url
				}\nAlbum: ${data.tracks.items[i].album.name} (${
					data.tracks.items[i].album.album_type
				})\n\n----------------`
			);
		}
	});
}

function getOMDB() {
	axios.get('http://www.omdbapi.com/?apikey=trilogy&t=' + searchItem).then(function(response) {
		console.log(`TITLE:  ${response.data.Title}\nRELEASED:  ${response.data.Released}\nIMDb RATING:  ${response.data.imdbRating}\nROTTEN TOMATOES:  ${response.data.Ratings[1].Value}\nCOUNTRY:  ${response.data.Country}\nLANGUAGE:  ${response.data.Language}\nPLOT:  ${response.data.Plot}\nSTARRING:  ${response.data.Actors}`);
	});
}

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
