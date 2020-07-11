const searchBar = document.getElementById('searchbar')
const matchtext = document.getElementById('matchtext')

const searchMovies = async searchtext => {
    const res = await fetch('../data/movies.json')
    const movies = await res.json() 
    let autocomplete = movies.filter(movie =>{
        const regex = new RegExp(`^${searchtext}`, 'gi')
        return movie.title.match(regex) || movie.year.match(regex) 
    })
    if(searchtext===""){
        autocomplete = []
        matchtext.innerHTML = '';
        // matchtext.style.padding = "0px";
    }
    else{
        printMatchedValues(autocomplete)
    }
}

const printMatchedValues = autocomplete => {
    
    const matchtexthtml = autocomplete.map(ac =>
        `<div>
        <h3 class="titleyear">${ac.title} (${ac.year})<h3>
        <h6 class="titleyear">(${ac.storyline})</h6>
        </div>`
    ).join('')
    // matchtext.style.padding = "7px";
    matchtext.innerHTML = matchtexthtml
}


searchBar.addEventListener('input', ()=> searchMovies(searchBar.value))
