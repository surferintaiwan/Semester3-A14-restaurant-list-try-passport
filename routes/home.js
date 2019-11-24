const express = require('express')
const router = express.Router()
const {authenticated} = require('../config/auth.js')

router.get('/', authenticated, (req, res) => [
    res.redirect('/restaurants')
])

module.exports = router