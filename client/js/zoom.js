// on importe le visuel createzoom avec variable


import { createZoomMovieList } from '../components/fonctionBlock.js'

//ca c'est dquery de notre adresse ,
//URL permet de traduire puis id permet de récuperer id dans les urlseachparams
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

// le fetch p
fetch(`http://localhost:3000/movies/${id}`)
    .then(response => response.json())
    .then (elem => {
        const favOne = document.getElementById('favOne') //on recup notre div index.html
        console.log(elem)
        favOne.innerHTML = createZoomMovieList(elem)
    })