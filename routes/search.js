const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

router.get('/', (req, res) => {
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

module.exports = router
