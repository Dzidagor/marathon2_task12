"use strict";



const numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?", "");

let personalMovieDB = {
  count: 30,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
  showMyDB() {
    if (!this.privat) {
      console.log(this);
    }
  },
  writeYourGenres() {
    let counter = 0;
    while (counter <= 2) {
      const genre = prompt(`Ваш любимый жанр под номером ${counter+1}`)
      if (genre == null || genre.length == 0) {
        continue
      }
      counter ++;
      this.genres.push(genre);
    }
    this.genres.forEach((genre, i) => console.log(`Любимый жанр ${i+1} - это ${genre}`));
  },
  writeYourMovies() {
    let counter = 0;
    while (counter <= 5) {
      const movie = prompt("Один из последних просмотренных фильмов?", ""),
            rate = prompt("На сколько оцените его?", "");
    if (movie == null || rate == null || movie.length == 0 || rate.length == 0 || movie.length > 50) {
      continue;
    }
    counter++;
    this.movies[movie] = rate;
    }
  },
  toggleVisibleMyDB() {
    this.privat = !this.privat
  },
};


document.getElementById('movieForm').addEventListener('submit', function(event) {

  event.preventDefault();


  let movieTitle = document.getElementById('movieTitle').value;
  let movieRating = document.getElementById('movieRating').value;

  
  personalMovieDB.movies[movieTitle] = movieRating;

  let newDiv = document.createElement("div");

  newDiv.classList.add('films__plate');

  newDiv.innerHTML = `<h2 class="films__title">${movieTitle}</h2><h3 class="films__subtitle">Рейтинг: ${movieRating}</h3>`;

  let container = document.querySelector('.films__container');

  container.appendChild(newDiv);

  event.target.reset();
});
