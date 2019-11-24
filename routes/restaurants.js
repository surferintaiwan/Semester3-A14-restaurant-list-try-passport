const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const {authenticated} = require('../config/auth.js') 

// 列出所有餐廳"頁面"
router.get('/',authenticated ,(req,res) => [
    Restaurant.find({userId : req.user._id})
        .exec((err,allRestaurants)=> {
            if (err) return console.error(err)
            res.render('index', {
                restaurant: allRestaurants,
                css: 'index.css'
            })
        })
    /* 這是原本還沒有加上userId關聯的時候寫法
    Restaurant.find((err,allRestaurants)=> {
        if (err) return console.error(err)
        res.render('index', {
            restaurant: allRestaurants,
            css: 'index.css'
        })
    })
    */
])

// 將餐廳進行排序
router.get('/sort/:sort', authenticated, (req,res) => {
    let sortSetting = {}
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

    // 依據不同的排序方式，至資料庫索取排序後的資料
    Restaurant.find({userId: req.user._id})
        .sort(sortSetting)
        .exec((err, allRestaurants) => {
            if (err) return console.error(err)
            res.render('index', {
                restaurant: allRestaurants,
                css: 'index.css',
            })
        })
})

// 餐廳的新增"頁面"
router.get('/new', authenticated, (req, res) => {
    res.render('new', {css: 'new.css'})
})

// POST進行餐廳資料新增
router.post('/new', authenticated, (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        category: req.body.category,
        location: req.body.location,
        phone: req.body.phone,
        description: req.body.description,
        image: req.body.image,
        rating: req.body.rating,
        userId: req.user._id
    })
    restaurant.save(err => {
        if (err) return console.error(err)
        return res.redirect('/restaurants')
    })
})

// 餐廳詳細資料"頁面"
router.get('/:id', authenticated, (req, res) => {
    Restaurant.findOne({userId: req.user._id, _id:req.params.id}, (err, eachRestaurant) => {
        res.render('detail', {
            restaurant: eachRestaurant,
            css: 'detail.css'
        })
    })

    /* 這是原本還沒有加上userId關聯的時候寫法
    Restaurant.find((err, allRestaurants) => {
        let eachRestaurant = allRestaurants.find((restaurant)=>{
            return restaurant.id.toString() === req.params.id.toString()   
        })
        res.render('detail', {
            restaurant: eachRestaurant,
            css: 'detail.css'
        })
    })
    */
})

// 餐廳的編輯"頁面"
router.get('/:id/edit', authenticated, (req, res) => {
    Restaurant.findOne({userId: req.user._id, _id: req.params.id}, (err, restaurant) => {
        if (err) return console.error(err)
        return res.render('edit', {
            restaurant: restaurant,
            css: 'edit.css'
        })
    })
})

// PUT進行餐廳資料編輯
router.put('/:id/edit', authenticated, (req, res) => {
    Restaurant.findOne({userId: req.user._id, _id:req.params.id}, (err, restaurant) => {
        if (err) return console.error(err)
        restaurant.name = req.body.name
        restaurant.category = req.body.category
        restaurant.location = req.body.location
        restaurant.phone = req.body.phone
        restaurant.description = req.body.description
        restaurant.image = req.body.image
        restaurant.rating = req.body.rating
        restaurant.save(err, ()=> {
            if (err) console.error(err)
        })
        return res.redirect('/restaurants/' + req.params.id)
    })
})

// DELETE進行餐廳資料刪除
router.delete('/:id', authenticated,(req, res)=>{
    Restaurant.findOne({userId: req.user._id, _id:req.params.id}, (err, restaurant)=>{
        if (err) return console.error(err)
        restaurant.remove(err, () => {
            if (err) return console.error(err)
            return res.redirect('/restaurants')
        })
        
    })
})

module.exports = router 