# 餐廳美食筆記-可註冊、登入、登出、新增餐廳資料
此網站使用node.js環境 + Express + mongoDB建立而成。
可供用戶註冊、登入、登出，建立專屬於自己收藏的美食餐廳資料。
--
## 網站截圖
![網站截圖](https://github.com/surferintaiwan/Semester3-A11-restaurant-list-try-RESTful/blob/master/index-photo.png?raw=true)

---

## 功能說明
1. 使用者可註冊(註冊時，資料輸入有誤，皆會提示警告)
2. 使用者可登入(選擇註冊的帳號登入或以FACEBOOK登入)
3. 使用者可登出(登出後，會提示登出成功)
4. 使用者若未登入則強行自行輸入網址欲瀏覽餐廳資料，則會自動跳轉至登入頁，並提示需要登入才可瀏覽

<若於登入後>

4. 可瀏覽所有店家
一進入[首頁](http://localhost:3000/)，可瀏覽目前網站內所有店家

5. 詳細店家介紹

點擊任一店家，會將店家詳細資料顯示

6. 店家搜尋功能

使用者可於搜尋欄輸入中英文，查詢與店家名稱匹配之店家

7. 使用者可刪除店家(首頁及詳細店家介紹頁面)
8.  使用者可編輯店家(首頁及詳細店家介紹頁面)
9. 使用者可新增店家(點擊右上角Add a restaurant)
10. 餐廳列表可依據不同方式排序(可依店名、位置、餐廳類別、評分排序)
11. 使用者可註冊、登入()、登出，並會依據不同狀況

---

## 開始使用
1. 下載本專案檔案至本地端
```
git clone https://github.com/surferintaiwan/Semester3-A14-restaurant-list-try-passport.git
```
2. 於終端機打開專案檔案
```
cd Semester3-A14-restaurant-list-try-passport
```
3. 於終端機安裝npm

此命令會查詢package.json看本專案使用了哪些套件，並自動安裝
```
npm install
```
4. 於終端機運行/seeder/seeder.js

因為一開始mongoDB內沒有任何資料，為了方便測試使用，可以透過執行此一檔案，將兩個使用者以及各三筆餐廳資料先放進mongoDB。

使用者資料是來自seeder.js之中，餐廳資料則自seeder.js呼叫restaurant.json進行引入。
```
node ./seeder/seeder.js
```
* 第一位使用者資料:
name: '小明',
email: '111@xxx.com',
password: '123'
* 第一位使用者已有的三筆餐廳資料:
Sababa 沙巴巴中東美食, 
梅子鰻蒲燒專賣店,
ZIGA ZIGA
* 第二位使用者資料:
name: '小明',
email: '222@xxx.com',
password: '123'
* 第二位使用者已有的三筆餐廳資料:
艾朋牛排餐酒館, 
Gusto Pizza,
WXYZ Bar

5. 於終端機啟用並監聽伺服器
```
nodemon app.js
```
6. 於瀏覽器輸入 [http://localhost:3000/](http://localhost:3000/) 即可開始使用建立於本地端之餐廳網站

7. 若欲停止伺服器運行，可於終端機輸入Ctrl + C ，即可停用伺服器

---

## 環境配置
### Web Server
* node.js > v12.12.0
### DB
* mongoDB

### 套件
#### 前端美化
* jquery > 3.4.1
* bootstrap > 5.11.2
* popper
#### nodejs套件
* nodemon (監控伺服器，當有檔案更新會自動重啟伺服器)
* express (後端框架)
* express-handlebars
* mongoose (連接mongoDB資料庫)
* method-override (from以POST送出時，可依照需求將POST改為PUT或DELETE)
* express-session (可以截取cookie資訊、幫忙產生session儲存於資料庫)
* passport (用於登入、登出驗證，要與express-session搭配使用)
* passport-local (帳密是創建於資料庫，則使用此方式驗證)
* passport-facebook (用於facebook登入驗證)
* dot-env (用於隱藏私密訊息，如上一個套件需輸入facebook app帳密，可於上傳github時隱藏)
* bcryptjs 將密碼進行雜湊處理(在註冊及登入時皆會用到)
* connect-flash(可以將值送進req.locals，供view使用)

## 專案貢獻者
[Shawn](https://github.com/surferintaiwan)


