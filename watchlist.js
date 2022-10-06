const watchList = document.getElementById("watchlist-container")

const emptyText = `<div id="watchlist">               
                <div class="watchlist-text">Your watchlist is looking a little empty...</div>
                <div class="watchlist-subtext"><a href="./index.html"><img src="./images/plus.png" class="addBtn"/>Let's add some movies!</a></div>
            </div>`
  
  function renderMovieList() {
      if (localStorage.getItem("movieList") )    {
            watchList.innerHTML = localStorage.getItem("movieList")
        }  else {
            watchList.innerHTML = emptyText
        }  
  }          
   

renderMovieList()

function removeMovie(event) {
    let id = event.target.name
    let list = localStorage.getItem("movieList")
    let listHTML = document.getElementById(id).outerHTML
    let updatedList = list.replace(listHTML, "")
    localStorage.setItem("movieList", updatedList)
    document.getElementById(id).outerHTML = ""
    localStorage.removeItem("movie")
    renderMovieList()
}

