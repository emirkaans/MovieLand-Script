const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=2";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const containerEl = document.querySelector(".container");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  renderMovies(data.results);
}

function renderMovies(movies) {
  containerEl.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
    
    <div class="poster">
    <img src="${IMG_PATH + poster_path}" alt="${title}" />
  </div>
  <div class="name-score">
    <h3>${title}</h3>
    <span class="${chooseClass(vote_average)}">${Number(
      vote_average.toFixed(1)
    )}</span>
  </div>
  <div class="description">
    <p>${overview} </p>
  </div>
    `;

    containerEl.appendChild(movieCard);
  });
}

function chooseClass(rate) {
  if (rate >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  }
});
