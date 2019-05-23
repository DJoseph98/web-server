const path =  require('path')   //lib de nodeJS pour gérer les assets
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000    //condition port d'écoute

// Path Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // nom du nouveau dossier à utiliser à la place de views
const partialsPath = path.join(__dirname, '../templates/partials')

// Configuration of handlebars and views location
app.set('views', viewsPath) // remplacement de l'ancien nom en nouveau
app.set('view engine', 'hbs') // use le template hbs pour le moteur de views ('views engine')
hbs.registerPartials(partialsPath)

//Static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { // controller + route
  res.render('index',
      {             // render comme synfony, on lui passe un objet en second argument
          title: 'Meteo',
          name: 'Didier'
      })
})

app.get('/about', (req, res) => { // controller + route
    res.render('about',
        {             // render comme synfony, on lui passe un objet en second argument
            title: 'About',
            name: 'Didier'
        })
})

app.get('/help', (req, res) => { // controller + route
    res.render('help',
        {             // render comme synfony, on lui passe un objet en second argument
            title: 'Help',
            name: 'Didier'
        })
})

app.get('/weather', (req, res) => { // controller + route
    if(!req.query.adress) {
        return res.send({
            error: 'Error, Adress must be provided'
        })
    }

    geocode(req.query.adress, (error, {latitude, longitude, location} = {} ) => {  // convention 2 arguments error + data pour des fonctions de callback
        if (error) {
            return  res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {  // convention 2 arguments error + data pour des fonctions de callback
            if (error) {
                return  res.send({error})
            }

            res.send({
                location,
                forecast: forecastData,
                adress: req.query.adress
            })
        })
    })

})

app.get('/products', (req, res) => { // controller + route
    if (!req.query.rating){ // regarde si dans ma requete, j'ai une key de nom "rating"
        return res.send({
            error :"Error, you must provide a rating item"
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/units', (req, res) => {
    res.render('error',
        {   number: '404',
            error: 'Error, article not found'
        })
})

app.get('*', (req, res) => { // match toutes les routes qui existent pas -> !!!! Le mettre à la fin car si mit au dessus, n'importe quel lien renverra sur la page d'erreur.
    res.render('error',
        {   number: '404',
            error: 'Error 404, page not found'
        })
})

app.listen(port, () =>{  //port server
    console.log('Server is up on port ' + port)
})
