# liri-node-app
A SIRI like application named LIRI, which is a _Language_ Interpretation and Recognition Interface.

## Requirement
1. You will need to create your own .env file containing, replacing the id, scecrets, and keys with your own (**no quotes**):

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```

2. You will need access the liri.js file to change the variable:

```js
line 4: var params = {screen_name: '<insert your own developer twitter screen name>'};
```

## How to use
After cloning and meeting all the requirements, on Git Bash Terminal

#### Twitter Info
This will access the 20 latest tweets made and when it was made
```
node liri.js my-tweets
```
#### Spotify Songs
This will find top song under that name and give you the:
	1. Artist
	2. Song name
	3. Album
	4. Preview link of song.
```
node liri.js spotify-this-song <insert song name[optional]>
```
#### Movie Info
This will give:
	1. Movie title
	2. Year of Release
	3. IMDB Rating
	4. Rotten Tomato Rating
	5. Country
	6. Language
	7. Plot
	8. Actors/Actresses
```
node liri.js movie-this <insert movie name[optional]>
```
#### Do What It Says
This will read the random.txt file and do what the text file says.
```
node liri.js do-what-it-says
```