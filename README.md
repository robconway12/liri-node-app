LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

User enters the following commands into the command line:

1) node liri.js concert-this <artist/band name here>

   This will search the Bands in Town Artist Events API for an artist and render information about each event to the terminal.


2) node liri.js spotify-this-song '<song name here>'

   This will show information about the song in your terminal/bash window. If no song is provided, the program will default to "The Sign" by Ace of Base.
   Utilizes the node-spotify-api package in order to retrieve song information from the Spotify API.

3) node liri.js movie-this '<movie name here>'
   This will output information about the movie to your terminal/bash window. If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
   Uses the axios package to retrieve data from the OMDB API.

4) node liri.js do-what-it-says
   Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
   Edit the text in random.txt to run each type of search feature.