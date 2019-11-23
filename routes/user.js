const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    
})

router.get('/register', (req, res)=> {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body
    User.findOne({email: email}).then(user => {
        // 如果使用者存在，就回到註冊頁
        if (user) {
            console.log('使用者存在')
            res.render('register',{
                name,
                email,
                password,
                password2
            })
        } else {   // 如果使用者不存在，就儲存到資料庫
            const newUser = new User({
                name,
                email,
                password
            })
            newUser
                .save()
                .then(user => {
                    res.redirect('/')
                })
                .catch(err => console.log(err))
        }
    })
})

router.post('/logout', (req, res) => {

})

module.exports = router