const express = require('express')
const router = express.Router()

const fs = require('fs')
const util = require('util')
const path = require('path')
const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)
const bodyParser = require('body-parser')
const multer = require('multer')


//test

const publicImagesPath = path.join(__dirname, 'public/images')

const storage = multer.diskStorage({
  destination: publicImagesPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500000, // 500 KB
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/png'
      && file.mimetype !== 'image/jpeg'
      && file.mimetype !== 'image/jpg') {
      return callback(Error('invalid file type'), false)
    }
    callback(null, true)
  }
})


router.use('/images', express.static(publicImagesPath))

//upload
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


router.post('/', upload.single('poster'), (req, res, next) => {
  const data = req.body
  console.log('data:', data)

  const file = req.file
  console.log('file:', file)

  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const fileName = `${id}.json`
  const filePath = path.join(__dirname, '../mocks/movies', fileName)

  data.img = file.originalname
  data.id = id
  data.year = Number(data.year)

  writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    .then(() => res.json('ok'))
    .catch(next)
})


//For display all movies on index.html with FS and promise
router.get('/', (request, response) => {
  const moviesDir = path.join(__dirname,'../mocks/movies/')
  readdir(moviesDir)
    .then(files => {
      // join moviesDir et file pour avoir le chemin pour chaque fichier
      const filepaths = files.map(file => path.join(moviesDir, file))
      const allFiles = filepaths.map(filepath => {
        //lit et met en attente, pour chaque chemin
        return readFile(filepath,'utf8')
      })
      Promise.all(allFiles)
        .then(allFilesValues => {
          //en js convert
          const valuesInJason = allFilesValues.map(JSON.parse)
          //console.log(valuesInJason)
          response.json(valuesInJason)
        })
        .catch(err => {
          console.error(err)
          response.status(500).end('il y a ue un soucis :(')
        })
    })
  })


router.get('/:id', (request, response) => {
  // VARIABLE filename QUI PERMET DE GET TOUS LES ID DE NOS DOSSIER
    const filename = `${request.params.id}.json`
    //variable qui permet d'affilier le chemin exact de nos filename
    //ou que l'on soit quand on lance le serveur
    const filepath = path.join(__dirname,'../mocks/movies/', filename)

//methode readFile, on lit ce que contient filepath
    readFile(filepath)
      .then(data => {
        // puis apres then, on met une response dans header
        response.header('Content-Type','application/json; charset=utf-8')
        //on affiche ce que l'on veut,ici l'id fichier
        response.end(data)
      })
      .catch(err => {
        response.status(404).end('movie not found')
      })
  })


//Middleware of "Add data with post"
router.use((request, response, next) => {
  if (request.method === 'GET') return next()
  console.log('content-type', request.headers['content-type'])
  if (request.headers['content-type'].includes('multipart/form-data')) return next()
  let accumulator = ''
  request.on('data', data => {
    accumulator += data
  })
  request.on('end', () => {
    try {
      request.body = JSON.parse(accumulator)
      next()
    } catch (err) {
      next(err)
    }
  })
})

// test upload
// router.post('/',upload.single('image'), (request, response, next) => {
//     // console.log(request.files)
//   if (!request.file) {
//     console.log('No file received')
//     return response.status(500).json({ success: false })
//   }
//   console.log('file received')
//   console.log(request.file.path)
//   console.log(request.body)


  // const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  // const fileName = `${id}.json`
  // const filePath = path.join(__dirname, '../mocks/movies', fileName)

//request
  // const imgName = `${request.file.path}`
  // const imgFilePath = path.join(imgName)
  // console.log(imgFilePath)

  //const content = {
    // id: id,
    // Movie: request.body.title,
    // Description: request.body.description,
    // Genre: request.body.genre,
    // Actors: request.body.actors,
    // Year:request.body.year,
   // Img: imgFilePath
    //createdAt: Date.now()
  //}
  // writeFile(filePath, JSON.stringify(content, null, 2), 'utf8')
  // .then(() => response.json('ok'))
  // .catch(next)
  // })





//FORM

// router.post('/',(request, response, next) => {
//   const id = Math.random().toString(36).slice(2).padEnd(11, '0')
//   const fileName = `${id}.json`
//   const filePath = path.join(__dirname, '../mocks/movies', fileName)

//   const content = {
//     id: id,
//     Movie: request.body.title,
//     Description: request.body.description,
//     Genre: request.body.genre,
//     Actors: request.body.actors,
//     Year:request.body.year
//     //createdAt: Date.now()
//   }
//   writeFile(filePath, JSON.stringify(content, null, 2), 'utf8')
//   .then(() => response.json('ok'))
//   .catch(next)
//   })




module.exports = router
// rend router express.Router() exportable pour etre uti pr api