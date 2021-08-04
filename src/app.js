
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')

//console.log(path.join(__dirname,'../public'))

const app = express()

//define pahts for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup hanlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('/help',(req,res) =>{
//     res.send('Help Page !!')
// })

// app.get('/about',(req,res) => {
//     res.send("<h1>about Page !!</h1>")
// })

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Ayman'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Ayman'
    })
})

app.get('/help',(req,res) => {
    res.render('Help',{
        helpText:'This is a nice message !',
        name: 'Ayman',
        title: 'Help'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({error: 'Address must be provided !'})
    }
    //country , weather_descriptions, lat , lon
    geocode(req.query.address,(error, {location , current} = {}) => {
        if(error){
            return res.send({error})
        }
        //console.log(location)
        res.send({
            location: location.country,
            weather: current.weather_descriptions[0],
            latitude: location.lat,
            longitude: location.lon,
            address: req.query.address
        })
    })
    
    // res.send({
    //     location: 'UAE',
    //     weather: 'so hot',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res) => {
    //res.send('Help article does not exist')
    res.render('404',{
        title: '404',
        name: 'Ayman',
        errorMessage: 'Help article does not exist',
    })
})

app.get('*',(req,res) => {
    //res.send('My 404 Page')
    res.render('404',{
        title: '404',
        name: 'Ayman',
        errorMessage: 'Page not Found !',
    })
})

app.listen(3000,() => {
    console.log('server is running in port 3000')
})