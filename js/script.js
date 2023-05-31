"use strict";



// const numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?", "");

let personalMovieDB = {
  count: 30,
  movies: {},
  favMovies: [],
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

let container = document.querySelector('.films__container');

function add_new_card(title, rate) {
  let newDiv = document.createElement("div");
  newDiv.classList.add('films__plate');
  newDiv.innerHTML = `<h2 class="films__title">${title}</h2><h3 class="films__subtitle">Рейтинг: ${rate}</h3><div style='cursor:pointer;' class="delete-btn" data-key="${title}">Удалить</div><div style='cursor:pointer;' class="fav-btn" data-key="${title}">Добавить в любимое</div>`;
  container.appendChild(newDiv);
  newDiv.querySelector(".delete-btn").addEventListener("click", (event) => {
    delete personalMovieDB.movies[title];
    newDiv.remove();
    console.log(personalMovieDB.movies);
  })
  newDiv.querySelector(".fav-btn").addEventListener("click", (event) => {
    personalMovieDB.favMovies.push(title);
    console.log(personalMovieDB.favMovies)
  })
};

function reverseAlphabetical(a, b) {
  if (a > b) {
      return -1;
  } else if (a < b) {
      return 1;
  } else {
      return 0;
  }
};

function delete_card(str) {
  console.log(document.querySelector(`#${selector}`));
};

function sort_films(flag) {

  container.innerHTML = "";
  let keys = Object.keys(personalMovieDB.movies);
  if (flag){
    keys.sort();
  } else {
    keys.sort(reverseAlphabetical);
  }
  console.log(keys);
  keys.forEach(key => {
    add_new_card(key, personalMovieDB.movies[key]);
  });
}

function show_fav(){
  container.innerHTML = "";
  let films = personalMovieDB.favMovies;
  films.forEach(key => {
    add_new_card(key, personalMovieDB.movies[key]);
  });
}
document.querySelector(".btn-sort-by-name").addEventListener('click', () => sort_films(1));
document.querySelector(".btn-sort-by-rate").addEventListener('click', () => sort_films(0));
document.querySelector(".btn-show-fav").addEventListener('click', show_fav);

document.getElementById('movieForm').addEventListener('submit', function(event) {

  event.preventDefault();


  let movieTitle = document.getElementById('movieTitle').value;
  let movieRating = document.getElementById('movieRating').value;
  if (movieTitle.length >= 21) {
    movieTitle = movieTitle.slice(0, 18) + "...";
    personalMovieDB.movies[movieTitle] = movieRating;
  } else {
    personalMovieDB.movies[movieTitle] = movieRating;
  }

  add_new_card(movieTitle, movieRating);

  event.target.reset();
});
