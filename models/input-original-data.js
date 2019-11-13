// 此檔案僅需在一開始執行一次，將restaurant.json的餐廳資料倒進資料庫內
const allRestaurantData = require('../restaurant.json').results
const mongoose = require('mongoose')
const Restaurant = require('./restaurant.js')
mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', () => {
    console.log('db error!')
})

db.once('open', ()=> {
    console.log('db connected!')
    for (let eachRestaurant of allRestaurantData) {
        const restaurant = new Restaurant({
            name: eachRestaurant.name,
            category: eachRestaurant.category,
            location: eachRestaurant.location ,
            phone: eachRestaurant.phone,
            description: eachRestaurant.description,
            image: eachRestaurant.image,
            rating: eachRestaurant.rating 
        })
        restaurant.save(err => {
            if (err) return console.error(err)
        })
    }
})
