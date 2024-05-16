#!/usr/bin/node

const request = require('request');

// Function to fetch movie data from the API
function fetchMovieData(movieId, callback) {
    const url = `https://swapi-api.hbtn.io/api/films/${movieId}/`;
    request(url, (error, response, body) => {
        if (error) {
            callback(error, null);
        } else if (response.statusCode !== 200) {
            callback(new Error(`Failed to fetch data: ${response.statusCode}`), null);
        } else {
            const movie = JSON.parse(body);
            callback(null, movie);
        }
    });
}

// Function to print characters
function printCharacters(movie) {
    const characters = movie.characters;
    characters.forEach(characterUrl => {
        request(characterUrl, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const character = JSON.parse(body);
                console.log(character.name);
            } else {
                console.error(`Failed to fetch character: ${characterUrl}`);
            }
        });
    });
}

// Main function
function main() {
    const movieId = process.argv[2];
    if (!movieId || isNaN(movieId)) {
        console.error("Usage: ./100-starwars_characters.js <movie_id>");
        process.exit(1);
    }

    fetchMovieData(movieId, (error, movie) => {
        if (error) {
            console.error(error.message);
            process.exit(1);
        }
        printCharacters(movie);
    });
}

// Entry point
main();
