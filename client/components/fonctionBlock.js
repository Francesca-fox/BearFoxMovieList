//exemple de block qu'on veut
export const createMovieList = movie => {
    return `
    <a href=zoom.html?id=${movie.id}>
    <div class="createMv">
        <p> Movie: ${movie.title} </p>
        <p> Description: ${movie.description} </p>
        <p> Year: ${movie.year} </p>
        <img src="http://localhost:3000/movies/images/${movie.img}" />
    </div>
    </a>
     `
 }

export const createZoomMovieList = movie => {
    return `
    <div class="createZoom">
        <p> Movie: ${movie.title} </p>
        <p> Description: ${movie.description} </p>
        <p> Genre : ${movie.genre} </p>
        <p> Actors: ${movie.actors} </p>
        <p> Year: ${movie.year} </p>
    </div>
    `
}