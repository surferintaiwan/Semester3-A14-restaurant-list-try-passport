// 在這裡做一些passport的基本設定
// 設定passport-local
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user.js')

module.exports = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, {message: '還沒註冊'})
                }
                if (user.password !== password) {
                    return done(null, false, {message: 'email或密碼錯誤'})
                }
                return done(null, user)
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