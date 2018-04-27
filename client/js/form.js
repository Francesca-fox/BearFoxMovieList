//FORM AJOUT MOVIE

document.getElementById('addMovie').addEventListener('submit', event => {
  event.preventDefault()
  const title = document.getElementById('addMovieTitle').value
  const description = document.getElementById('addMovieDescription').value
  const genre = document.getElementById('addMovieGenre').value
  const actors = document.getElementById('addMovieActors').value
  const year = document.getElementById('addMovieYear').value
  const img =  document.getElementById('addMovieImg').value

  fetch('http://localhost:3000/movies', {
    method: 'post',
    body: JSON.stringify({
      title,
      description,
      genre,
      actors,
      year,
      img
    })
  }).then(response => console.log(response.status))
  console.log('addMovieTitle', title )

})