const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const passport = require('passport')
const {authenticated} = require('../config/auth.js')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login'
    })(req, res, next)
})

router.get('/register', (req, res)=> {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body
    User.findOne({email: email}).then(user => {
        // 這裡會經過兩道關卡
        // 第一關是判斷註冊資訊有沒有漏掉的地方
        let errors = []
        if (!email || !password || !password2) {
            errors.push({message: '除了姓名以外，其他都是必填的喔'})
        }

        if (password !== password2) {
            errors.push({message: '兩次密碼不相符'})
        }

        if (errors.length > 0) {
            res.render('register', {
                name,
                email,
                password,
                password2,
                errors
            })
        } else {
        // 第二關才會判斷使用者有沒有存在
        // 如果使用者存在，就回到註冊頁
        if (user) {
            console.log('使用者存在')
            res.render('register', {
                name,
                email,
                password,
                password2,
                errors
            })
        } else {
            // 如果使用者不存在，就儲存到資料庫
            const newUser = new User({
                name,
                email,
                password
            })

            // 使用bcrypt對密碼做處理
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    // 把這個新的user資料都存起來
                    newUser
                        .save()
                        .then(user => {
                            req.flash('success_msg', '註冊成功')
                            res.redirect('/users/login')
                        })
                        .catch(err => console.log(err))
                })
            })
            
        }
        }

        
        
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '您已經登出了')
    res.redirect('/users/login')
})

module.exports = router