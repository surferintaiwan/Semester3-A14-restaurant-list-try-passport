const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

let value = ''
// 顯示搜尋結果頁
router.get('/', (req, res) => {
    let sortSetting = {}
    value = req.query.keyword
    // 判斷是哪種排序方式
    if (req.params.sort === 'name-asc') {
        sortSetting.name = 'asc'
    } else if (req.params.sort === 'name-desc') {
        sortSetting.name = 'desc'
    } else if (req.params.sort === 'location') {
        sortSetting.location = 'asc'
    } else if (req.params.sort === 'category') {
        sortSetting.category = 'asc'
    } else if (req.params.sort === 'rating-asc') {
        sortSetting.rating = 'asc'
    } else if (req.params.sort === 'rating-desc') {
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
        res.render('search', {
            restaurant: searchRestaurant,
            css: 'index.css',
            value: value,
        })
    })
})


// 於搜尋結果頁按不同排序方式呈現
router.get('/sort/:sort', (req, res) => {
    let sortSetting = {}
    // 判斷是哪種排序方式
    let sort = req.params.sort
    if (req.params.sort === 'name-asc') {
        sortSetting.name = 'asc'
        console.log(123)
    } else if (req.params.sort === 'name-desc') {
        sortSetting.name = 'desc'
    } else if (req.params.sort === 'location') {
        sortSetting.location = 'asc'
    } else if (req.params.sort === 'category') {
        sortSetting.category = 'asc'
    } else if (req.params.sort === 'rating-asc') {
        sortSetting.rating = 'asc'
    } else if (req.params.sort === 'rating-desc') {
        sortSetting.rating = 'desc'
    }
    
    // 依據不同的排序方式，至資料庫索取排序後的資料，接著比對哪幾筆資料與使用者搜尋的關鍵字符合
    let searchRestaurant = []
    Restaurant.find({})
    .sort(sortSetting)
    .exec((err, allRestaurants) => {
        if (err) return console.error(err)
        searchRestaurant = allRestaurants.filter((restaurant) => {
            if (restaurant.name.toLowerCase().includes(value.toLowerCase()) || restaurant.category.toLowerCase().includes(value.toLowerCase())) {
                return true
            }
        })
        res.render('search', {
            restaurant: searchRestaurant,
            css: 'index.css',
            value: value,
        })
        
    })
    
})


module.exports = router