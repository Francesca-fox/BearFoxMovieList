const express = require('express')
const app = express()
const movieRoute = require('../routes/movies.js')
//On importe nos routes movies

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Acces-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/movies', movieRoute)
//middleware pour indiquer d'utiliser la route /movies?js


app.get('/',(req,res) => {
    res.send("Vous etes co au serveur")
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})