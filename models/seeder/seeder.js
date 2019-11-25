// 此檔案僅需在一開始執行一次，將restaurant.json的餐廳資料倒進資料庫內
const allRestaurantData = require('../../restaurant.json').results
const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const bcrypt = require('bcryptjs')
mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', () => {
    console.log('db error!')
})

db.once('open', () => {
    console.log('db connected!')
    // ---加入第一位使用者--- 
    let user1 = new User({
        name: '小明',
        email: '111@xxx.com',
        password: '123'
    })
    // 用bcryptjs加鹽後儲存，接著將餐廳資料導入
    bcrypt.genSalt(10, (err,salt)=> {
        bcrypt.hash(user1.password, salt, (err,hash)=> {
            if (err) throw err
            user1.password = hash
            user1
                .save()
                .then(user => {
                    for (let i = 0; i <= 2; i++) {
                        saveRestaurant(user, i)
                    }
                })
                .catch(err => {console.log(err)})
        })
    })
    
    //??助教，我想說試試看我前面儲存進去的資料是否存在，但為什麼user印出來是null?
        User.findOne({email: '111@xxx.com'}, (err, user) => {
        console.log(user)
    })
    

    // ---加入第二位使用者---
    // ??助教，為什麼我把兩個使用者都命明成 user 的話，就會只成功新增一個使用者呢?
    let user2 = new User({
        name: '小王',
        email: '222@xxx.com',
        password: '123'
    })
    // 用bcryptjs加鹽後儲存，接著將餐廳資料導入
    bcrypt.genSalt(10, (err,salt)=> {
        bcrypt.hash(user2.password, salt, (err,hash)=> {
            if (err) throw err
            user2.password = hash
            user2
                .save()
                .then(user => {
                    for (let i = 3; i <= 5; i++) {
                        saveRestaurant(user, i)
                    }
                })
                .catch(err => {console.log(err)})
        })
    })
})

function saveRestaurant(user, i) {
    const restaurant = new Restaurant({
        name: allRestaurantData[i].name,
        category: allRestaurantData[i].category,
        location: allRestaurantData[i].location ,
        phone: allRestaurantData[i].phone,
        description: allRestaurantData[i].description,
        image: allRestaurantData[i].image,
        rating: allRestaurantData[i].rating, 
        userId: user._id
    })
    restaurant.save(err => {
        if (err) return console.error(err)
    })
}