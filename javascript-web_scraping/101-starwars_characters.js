#!/usr/bin/node

const request = require('request');
const apiUrl = 'https://swapi-api.hbtn.io/api/films/';

// Function to fetch movie data from the API
function fetchMovieData(movieId, callback) {
    const url = `${apiUrl}${movieId}/`;
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

// Function to print characters in the right order
function printCharacters(movie) {
    const characters = movie.characters;
    const promises = characters.map(url => {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) {
                    reject(error);
                } else if (response.statusCode !== 200) {
                    reject(new Error(`Failed to fetch character: ${response.statusCode}`));
                } else {
                    const character = JSON.parse(body);
                    resolve(character.name);
                }
            });
        });
    });

    Promise.all(promises)
        .then(names => {
            names.forEach(name => console.log(name));
        })
        .catch(error => console.error(error));
}

// Main function
function main() {
    const movieId = process.argv[2];
    if (!movieId || isNaN(movieId)) {
        console.error("Usage: ./101-starwars_characters.js <movie_id>");
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
