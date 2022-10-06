

const apiKey = "82a3e1e"
let movies = []

const searchResults = document.getElementById("search-result-container")
const searchField = document.getElementById("input-text")

const startUpMessage = `<div class="start-text">
                            <img src="./images/movie.png" class="movie-icon" />
                            <div class="start-subtext">START EXPLORING</div>
                        </div>`
            
let searchText = ""


document.getElementById("clearBtn").addEventListener("click", function() {
    searchField.value = ""
    searchResults.innerHTML = startUpMessage
    localStorage.removeItem("movieSearch")  
})

if (localStorage.getItem("movieSearch") !== null) {
    searchResults.innerHTML = localStorage.getItem("movieSearch")
}

document.getElementById("submit").addEventListener("click", function() {
    searchResults.innerHTML = ""
    movies = []
    searchText = document.getElementById("input-text").value
    getAPI()
})

function getAPI() {
    // localStorage.removeItem("movieSearch")
    fetch(`https://www.omdbapi.com/?s=${searchText}&type=movie&apikey=${apiKey}`)
        .then( res => res.json())
        .then(data =>  { 
    getSearchList(data)})
}

function getSearchList(data) {
    localStorage.removeItem("movieSearch")
    if (data.Search === undefined) {
        searchResults.innerHTML = `
        <p class="no-result">Unable to find what you're looking for. 
        Please try another search.</p>
        `
    } else {
        let maxResultNumber = 0
        if (data.Search.length >= 5) {
            maxResultNumber = 5
        } else {
            maxResultNumber = data.Search.length
        }
        for (let i = 0; i < maxResultNumber; i++) {
            fetch(`https://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=${apiKey}`)
                .then(obj => obj.json())
                .then(movie => {                    
                   movies.push(getHtml(movie))                   
                   searchResults.innerHTML = movies.join(" ") 
                   localStorage.setItem("movieSearch", movies)
                })         
            }  
    }
      
   
}

    
    function getHtml(data) {
        let srcImg = data.Poster !== "N/A"? data.Poster : "./images/movie.png"
       return  `
            <div class="search-result" id=${data.imdbID}>
                
                <img  class="poster-img" src=${srcImg} />
                
                <div class="search-text">
                    <p>${data.Title} ⭐ ${data.imdbRating}</p>
                    <div class="movie-info">
                        <p>${data.Runtime} ${data.Genre}</p>
                       
                            <p class="action"><img class="addBtn" src="./images/plus.png" 
                                onclick="copyToLocalStorage(event)" name=${data.imdbID} id="copyBtn" />
                            Watchlist</p>
                       
                    </div>
                    <p>${data.Plot}</p>
                </div>
            </div>`
    }
    
    
    function copyToLocalStorage(event) {
        let id = event.target.name
        const copyEl = document.getElementById(id).outerHTML
        localStorage.setItem("movie", copyEl)
        addMovie()
        location.replace('./watchlist.html')    
    }
    
    function addMovie() {  
    let list = ""  
    let movie = localStorage.getItem("movie")
    let mov0 = movie.replace("addBtn", "removeBtn")
    let mov1 = mov0.replace("plus", "minus")
    let mov2 = mov1.replace("Watchlist", "remove")
    let mov3 = mov2.replace("copyToLocalStorage", "removeMovie" )
    if (localStorage.getItem("movieList") !== null) {
        list = localStorage.getItem("movieList") + mov3
    } else {
        list = mov3
    }
    
    localStorage.setItem("movieList", list)
}
    