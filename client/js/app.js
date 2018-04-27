//on import le file js pour question dorganisation
import { createMovieList } from '../components/fonctionBlock.js'


//ici ca fait le lien entre localhost 3000 et le server! on fetch pour avoir les 2 reliés
fetch('http://localhost:3000/movies') //liste de mocks depuis api index.js
    .then(response => response.json()) //on dem a lire les donnes en json
    .then(elems => { // on recup un tableau elems avec tt nos mocks
        console.log(elems)
        const bestMovies = document.getElementById('bestMovies') //on recup notre div index.html
        const arrayElems = elems.map(elem => createMovieList(elem))
        bestMovies.innerHTML = arrayElems.join('') //on injecte notre tableau dans la div
    })


