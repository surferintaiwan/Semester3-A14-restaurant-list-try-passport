// 在這裡做一些passport的基本設定
// 設定passport-local 跟passport-facebook
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, {message: '還沒註冊'})
                }
                // 使用bycryptjs來比對密碼正確否
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, {message: 'email或密碼錯誤'})
                    }
                })
                /* 這是原本沒有bcrypt處理密碼時，密碼的比對方法
                if (user.password !== password) {
                    return done(null, false, {message: 'email或密碼錯誤'})
                }
                return done(null, user)
                */
            })
        })
    )
    
    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRECT,
            callbackURL: process.env.FACEBOOK_CALLBACK,
            profileFields: ['email', 'displayName']
        }, 
        (accessToken, refreshToken, profile, done) => {
            // 尋找並建立使用者資料
            User.findOne({
                email: profile._json.email
            }).then(user => {
                // 如果沒有這個email就建立這個使用者
                if (!user) {
                    // 密碼是必填的，所以還是要塞個值進去，直接用亂數當密碼並且用bcryptjs處理過
                    let randomPassword = Math.random().toString(36).slice(-8)
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(randomPassword, salt, (err,hash) => {
                            let newUser = new User({
                                name: profile._json.name,
                                email: profile._json.email,
                                password: hash
                            })
                            newUser.save().then(user => {
                                return done(null, user)
                            }).catch(err => {
                                console.log(err)
                            })
                        })
                    })
                } else {
                    return done(null, user)
                }
            })
        })
    )


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user)
      })
    })
}