const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// 列出所有餐廳"頁面"
router.get('/', (req,res) => [
    Restaurant.find((err,allRestaurants)=> {
        if (err) return console.error(err)
        res.render('index', {
            restaurant: allRestaurants,
            css: 'index.css'
        })
    })
])

// 餐廳的新增"頁面"
router.get('/new', (req, res) => {
    res.render('new', {css: 'new.css'})
})

// 餐廳詳細資料"頁面"
router.get('/:id', (req, res) => {
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

// POST進行餐廳資料新增
router.post('/new', (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        category: req.body.category,
        location: req.body.location,
        phone: req.body.phone,
        description: req.body.description,
        image: req.body.image,
        rating: req.body.rating
    })
    restaurant.save(err => {
        if (err) return console.error(err)
        return res.redirect('/restaurants')
    })
})

// 餐廳的編輯"頁面"
router.get('/:id/edit', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) return console.error(err)
        return res.render('edit', {
            restaurant: restaurant,
            css: 'edit.css'
        })
    })
})

// POST進行餐廳資料編輯
router.post('/:id/edit', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
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

// POST進行餐廳資料刪除
router.post('/:id/delete',(req, res)=>{
    Restaurant.findById(req.params.id,(err, restaurant)=>{
        if (err) return console.error(err)
        restaurant.remove(err, () => {
            if (err) return console.error(err)
            return res.redirect('/restaurants')
        })
        
    })
})

module.exports = router 