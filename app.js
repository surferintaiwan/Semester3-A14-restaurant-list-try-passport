// --引入module--
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000
const Restaurant = require('./models/restaurant.js')
const methodOverride = require('method-override')
const session = require('express-session') 

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

// 設定express-session
app.use(session({
    secret: 'my restaurant key',   // secret: 定義一組屬於你的字串做為私鑰
    resave: false,
    saveUninitialized: true,
  }))

// -- 設定method-override --
app.use(methodOverride('_method'))

// -- 設定路由 --
app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurants.js'))
app.use('/search', require('./routes/search.js'))
app.use('/users', require('./routes/user.js'))

// -- 啟用並監控Server --
app.listen(port,() => {
    console.log(`nodemon is listening http://localhost/${port}`)
})