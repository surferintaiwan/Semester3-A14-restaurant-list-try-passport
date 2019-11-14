const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

router.get('/', (req, res) => {
    let sort = {}
    let sortSetting = {}
    // 判斷是哪種排序方式
    if (req.body.sort === 'name-asc') {
        sort.asc = true
        sortSetting.name = 'asc'
    } else if (req.body.sort === 'name-desc') {
        sort.desc = true
        sortSetting.name = 'desc'
    } else if (req.body.sort === 'location') {
        sort.location = true
        sortSetting.location = 'asc'
    } else if (req.body.sort === 'category') {
        sort.category = true
        sortSetting.category = 'asc'
    } else if (req.body.sort === 'rating-asc') {
        sort.rating = true
        sortSetting.rating = 'asc'
    } else if (req.body.sort === 'rating-desc') {
        sort.rating = true
        sortSetting.rating = 'desc'
    }
    
    // 依據不同的排序方式，至資料庫索取排序後的資料，接著比對哪幾筆資料與使用者搜尋的關鍵字符合
    let searchRestaurant = []
    Restaurant.find({})
    .sort(sortSetting)
    .exec((err, allRestaurants) => {
        if (err) return console.error(err)
        searchRestaurant = allRestaurants.filter((restaurant) => {
            if (restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())) {
                return true
            }
        })
        res.render('index', {
            restaurant: searchRestaurant,
            css: 'index.css',
            value: req.query.keyword,
            sort: sort
        })
    })
})

module.exports = router