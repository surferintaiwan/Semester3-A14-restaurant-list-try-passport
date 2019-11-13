// define port
const port = 3000

// require express
const express = require('express')
const app = express()

// require express-handlebars
const exphbs = require('express-handlebars')

// require restaurant data
const allRestaurantData = require('./restaurant.json')

// set template engine
app.engine('handlebars', exphbs( {defaultLayout: 'main'} ))
app.set('view engine', 'handlebars')

// set static files (this place puts css, jquery and popper files)
app.use(express.static('public'))

// set routes (each template has its own css)
app.get('/', (req, res) => {
    const cssStyle = 'index'
    res.render('index', {
        restaurant: allRestaurantData.results,
        css: 'index.css'
    })
})

app.get('/restaurants/:id', (req, res) => {
    const cssStyle = 'show'
    let eachRestaurantData = allRestaurantData.results.find((restaurant) => {
        return restaurant.id.toString() === req.params.id.toString()
    })
    res.render('show', {
        restaurant: eachRestaurantData,
        css: 'show.css'
    })
})

app.get('/search', (req, res) => {
    const cssStyle = 'index'
    let searchRestaurant = allRestaurantData.results.filter((restaurant) => {
        if (restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
        return true 
    })
    res.render('index', {
        restaurant: searchRestaurant,
        css: 'index.css',
        value: req.query.keyword
    })
    
    // 這邊想將.card-columns印出來，但顯示document is not defined
    // let cardColumns = window.document.querySelector('.card-columns')
    // console.log(cardColumns)
})

// listen and launch server
app.listen(port,() => {
    console.log(`nodemon is listening http://localhost/${port}`)
})

// 上網查到jsdom這個module，但不知道怎麼引入我的html
/*
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(``, {
    url: "http://localhost:3000/",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
  });
console.log()
*/