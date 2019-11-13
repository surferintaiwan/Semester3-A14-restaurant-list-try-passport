// --引入module--
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000
const Restaurant = require('./models/restaurant.js')
const allRestaurantData = require('./restaurant.json')

// -- 設定mongoose --
// 連線至本地端資料庫
mongoose.connect('mongodb://localhost/restaurant', { useUnifiedTopology: true })
// 獲取connection 
const db = mongoose.connection 
// 連線異常
db.on('error', () => {
    console.log('mongoDB error!')
})
// 連線正常
db.once('open', () => {
    console.log('mongoDB connected!')
})

// -- 設定body-parser --
app.use(bodyParser.urlencoded({ extended: true }))

// --設定handlebars--
app.engine('handlebars', exphbs( {defaultLayout: 'main'} ))
app.set('view engine', 'handlebars')

// -- 設定靜態檔案 -- (css, jquery and popper files)
app.use(express.static('public'))

// -- 設定路由 --
// 首頁自動跳轉至所有餐廳"頁面"
app.get('/', (req, res) => {
    res.redirect('/restaurants')
})

// 列出所有餐廳"頁面"
app.get('/restaurants', (req,res) => [
    Restaurant.find((err,allRestaurants)=> {
        if (err) return console.error(err)
        res.render('index', {
            restaurant: allRestaurants,
            css: 'index.css'
        })
    })
])

// 餐廳詳細資料"頁面"
app.get('/restaurants/:id', (req, res) => {
    Restaurant.find((err, allRestaurants) => {
        let eachRestaurant = allRestaurants.find((restaurant)=>{
            return restaurant.id.toString() === req.params.id.toString()   
        })
        res.render('detail', {
            restaurant: eachRestaurant,
            css: 'detail.css'
        })
    })
})

// 餐廳的新增"頁面"
app.get('/restaurants/new', (req, res) => {
    
})

// POST進行餐廳資料新增
app.post('restaurants/new', (req, res) => {

})

// 餐廳的編輯"頁面"
app.get('/restaurants/:id/edit', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) return console.error(err)
        return res.render('edit', {restaurant: restaurant})
    })
})

// POST進行餐廳資料編輯
app.post('/restaurants/:id/edit', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) return console.error(err)
        restaurant.name = req.body.name
        restaurant.category = req.body.category
        restaurant.location = req.body.location
        restaurant.phone = req.body.phone
        restaurant.description = req.body.description
        restaurant.image = req.body.image
        restaurant.save(err, ()=> {
            if (err) console.error(err)
        })
        return res.redirect('/restaurants/' + req.params.id)
    })
})

// POST進行餐廳資料刪除

// 搜尋結果頁
app.get('/search', (req, res) => {
    const cssStyle = 'index'
    Restaurant.find((err,allRestaurants) => {
        let searchRestaurant = allRestaurants.filter((restaurant) => {
            if (restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
            return true
        })
        res.render('index', {
            restaurant: searchRestaurant,
            css: 'index.css',
            value: req.query.keyword
        })
    })
})

// -- 啟用並監控Server --
app.listen(port,() => {
    console.log(`nodemon is listening http://localhost/${port}`)
})