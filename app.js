const API_URL =
  'https:api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'



const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results);
}

getMovies(API_URL);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm && searchTerm !== ""){
      getMovies(SEARCH_API + searchTerm);
      search.value = "";
    }else {
      window.location.reload();
    }
});


function showMovies(movies){
  main.innerHTML = "";

  movies.forEach((movie) => {
    const {title, poster_path, vote_average, overview} = movie;
    const movieDiv = document.createElement("div");

    movieDiv.innerHTML = 
    `

      <div class="main-blog">
        <div class="movie-card">
        <img src="${IMG_PATH + poster_path}" 
            alt="${title}">

            <div class="info">
                <h2>${title}</h2>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>${title} </h3>
                <small>overview</small>
                <p>
                    ${overview}
                </p>
            </div>
        </div>

      </div>
    
    `


    main.appendChild(movieDiv);
  });
}



function getClassByRate(vote){
  if(vote >= 7){
    return "green";
  } else if (vote >= 4){
    return "orange";
  } else {
    return "red";
  }
}
